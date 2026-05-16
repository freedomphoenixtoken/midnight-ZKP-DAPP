import { createClient } from '@supabase/supabase-js';
import { getWalletData } from '../../src/services/xrpl-service.js';
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

    // Prepare private inputs for ZK circuit
    const privateInputs = {
      walletAge: walletData.walletAge,
      transactionCount: walletData.transactionCount,
      xrpBalance: walletData.xrpBalance,
      holdsXRP: walletData.holdsXRP
    };

    // Validate circuit inputs
    const validation = validateCircuitInputs(CircuitType.AIRDROP_ELIGIBILITY, privateInputs);
    if (!validation.valid) {
      return { statusCode: 400, body: JSON.stringify({ error: validation.error }) };
    }

    // Generate ZK proof using sophisticated circuit simulation
    const zkProof = await generateZKProof(
      CircuitType.AIRDROP_ELIGIBILITY,
      privateInputs,
      { address: userAddress }
    );

    // Real eligibility data based on blockchain data
    const eligibilityData = {
      walletAge: walletData.walletAge,
      transactionCount: walletData.transactionCount,
      holdsXRP: walletData.holdsXRP,
      xrpBalance: walletData.xrpBalance,
      isEligible: walletData.walletAge >= 30 && walletData.transactionCount >= 5 && walletData.holdsXRP,
      proofDetails: extractProofData(zkProof)
    };

    // Store proof in database
    const { error: dbError } = await supabase
      .from('zk_proofs')
      .insert({
        proof_hash: zkProof.proofHash,
        proof_type: 'airdrop_eligibility',
        user_address: userAddress,
        user_did: userDid,
        proof_data: eligibilityData,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      });

    if (dbError) {
      console.error('Database error:', dbError);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        proofHash: zkProof.proofHash,
        eligibilityData,
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
