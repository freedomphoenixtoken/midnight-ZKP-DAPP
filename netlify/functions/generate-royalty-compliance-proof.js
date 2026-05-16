import { createClient } from '@supabase/supabase-js';
import { getWalletData, getNFTHoldings } from '../../src/services/xrpl-service.js';
import { generateZKProof, CircuitType, validateCircuitInputs, extractProofData } from '../../src/services/zk-circuit-service.js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { userAddress, userDid } = JSON.parse(event.body);

    if (!userAddress) {
      return { statusCode: 400, body: JSON.stringify({ error: 'userAddress is required' }) };
    }

    // Fetch real wallet data from XRPL
    const walletData = await getWalletData(userAddress, false);
    const nftHoldings = await getNFTHoldings(userAddress, false);

    // Prepare private inputs for ZK circuit
    const privateInputs = {
      transactionCount: walletData.transactionCount,
      nftCount: nftHoldings.length,
      nftHoldings: nftHoldings
    };

    // Validate circuit inputs
    const validation = validateCircuitInputs(CircuitType.ROYALTY_COMPLIANCE, privateInputs);
    if (!validation.valid) {
      return { statusCode: 400, body: JSON.stringify({ error: validation.error }) };
    }

    // Generate ZK proof using sophisticated circuit simulation
    const zkProof = await generateZKProof(
      CircuitType.ROYALTY_COMPLIANCE,
      privateInputs,
      { address: userAddress }
    );

    // Real compliance data based on blockchain data
    const complianceData = {
      transactionCount: walletData.transactionCount,
      nftCount: nftHoldings.length,
      isCompliant: walletData.transactionCount >= 10 && nftHoldings.length >= 1,
      proofDetails: extractProofData(zkProof)
    };

    // Store proof in database
    const { error: dbError } = await supabase
      .from('zk_proofs')
      .insert({
        proof_hash: zkProof.proofHash,
        proof_type: 'royalty_compliance',
        user_address: userAddress,
        user_did: userDid,
        proof_data: complianceData,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      });

    if (dbError) {
      console.error('Database error:', dbError);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        proofHash: zkProof.proofHash,
        complianceData,
        zkProof: {
          commitment: zkProof.publicInputs.commitment,
          nullifier: zkProof.publicInputs.nullifier,
          circuitHash: zkProof.metadata.circuitHash
        }
      })
    };
  } catch (error) {
    console.error('Error generating proof:', error);
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: 'Failed to generate proof', details: error.message }) 
    };
  }
};
