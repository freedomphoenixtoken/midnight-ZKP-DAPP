import { createClient } from '@supabase/supabase-js';
import { getWalletData, getTrustLines } from '../../src/services/xrpl-service.js';
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
    const trustLines = await getTrustLines(userAddress, false);

    // Prepare private inputs for ZK circuit
    const privateInputs = {
      xrpBalance: walletData.xrpBalance,
      tokenHoldings: trustLines.length,
      trustLines: trustLines
    };

    // Validate circuit inputs
    const validation = validateCircuitInputs(CircuitType.GOVERNANCE_POWER, privateInputs);
    if (!validation.valid) {
      return { statusCode: 400, body: JSON.stringify({ error: validation.error }) };
    }

    // Generate ZK proof using sophisticated circuit simulation
    const zkProof = await generateZKProof(
      CircuitType.GOVERNANCE_POWER,
      privateInputs,
      { address: userAddress }
    );

    // Real governance data based on blockchain data
    const governanceData = {
      xrpBalance: walletData.xrpBalance,
      tokenHoldings: trustLines.length,
      hasGovernancePower: walletData.xrpBalance >= 100 && trustLines.length >= 1,
      proofDetails: extractProofData(zkProof)
    };

    // Store proof in database
    const { error: dbError } = await supabase
      .from('zk_proofs')
      .insert({
        proof_hash: zkProof.proofHash,
        proof_type: 'governance_power',
        user_address: userAddress,
        user_did: userDid,
        proof_data: governanceData,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      });

    if (dbError) {
      console.error('Database error:', dbError);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        proofHash: zkProof.proofHash,
        governanceData,
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
