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
      transactionCount: walletData.transactionCount
    };

    // Validate circuit inputs
    const validation = validateCircuitInputs(CircuitType.RENTAL_TRUST, privateInputs);
    if (!validation.valid) {
      return { statusCode: 400, body: JSON.stringify({ error: validation.error }) };
    }

    // Generate ZK proof using sophisticated circuit simulation
    const zkProof = await generateZKProof(
      CircuitType.RENTAL_TRUST,
      privateInputs,
      { address: userAddress }
    );

    // Calculate trust score based on real blockchain data
    const trustScore = Math.min(100, Math.floor((walletData.transactionCount * 2) + (walletData.walletAge / 2)));
    
    const trustData = {
      walletAge: walletData.walletAge,
      transactionCount: walletData.transactionCount,
      trustScore: trustScore,
      reliabilityScore: Math.min(100, trustScore + 10),
      proofDetails: extractProofData(zkProof)
    };

    // Store proof in database
    const { error: dbError } = await supabase
      .from('zk_proofs')
      .insert({
        proof_hash: zkProof.proofHash,
        proof_type: 'rental_trust',
        user_address: userAddress,
        user_did: userDid,
        proof_data: trustData,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      });

    if (dbError) {
      console.error('Database error:', dbError);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        proofHash: zkProof.proofHash,
        trustData,
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
