import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Generate a mock ZK proof for demo purposes
function generateMockProof(address, proofType) {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(7);
  return {
    proofHash: `zk_${proofType}_${timestamp}_${randomString}`,
    publicInputs: {
      commitment: `commit_${timestamp}_${randomString}`,
      nullifier: `null_${timestamp}_${randomString}`,
      timestamp: timestamp
    },
    proof: {
      pi_a: [`${timestamp}`, `${randomString}`],
      pi_b: [[`${timestamp}`, `${randomString}`]],
      pi_c: [`${timestamp}`, `${randomString}`],
      protocol: 'groth16'
    },
    metadata: {
      circuitHash: `circuit_${proofType}_${randomString}`,
      provingKeyHash: `proving_${randomString}`,
      verificationKeyHash: `verifying_${randomString}`
    }
  };
}

export const handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const body = event.body || '{}';
    const { userAddress, userDid, totalRentals = 10, walletAge = 90, transactionCount = 20 } = JSON.parse(body);

    if (!userAddress) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'userAddress is required' }) };
    }

    // Generate mock ZK proof for demo
    const zkProof = generateMockProof(userAddress, 'rental_trust');

    // Mock trust data with verification code for XRPL
    const trustScore = Math.min(100, totalRentals * 5 + walletAge / 10);
    const trustData = {
      walletAge: walletAge,
      transactionCount: transactionCount,
      trustScore: trustScore,
      reliabilityScore: Math.min(100, trustScore + 10),
      proofDetails: zkProof,
      verificationCode: `ZK_VERIFY_${Date.now()}_${Math.random().toString(36).substring(7)}`
    };

    // Store proof in database
    try {
      const { error: dbError } = await supabase
        .from('zk_proofs')
        .insert({
          proof_hash: zkProof.proofHash,
          proof_type: 'rental_trust',
          user_address: userAddress,
          user_did: userDid || userAddress,
          proof_data: trustData,
          expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        });

      if (dbError) {
        console.error('Database error:', dbError);
      }
    } catch (dbError) {
      console.error('Database insert failed:', dbError);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true,
        proofHash: zkProof.proofHash,
        trustData,
        zkProof: {
          commitment: zkProof.publicInputs.commitment,
          nullifier: zkProof.publicInputs.nullifier,
          circuitHash: zkProof.metadata.circuitHash,
          verificationCode: trustData.verificationCode
        }
      })
    };
  } catch (error) {
    console.error('Error generating proof:', error);
    return { 
      statusCode: 500, 
      headers,
      body: JSON.stringify({ error: 'Failed to generate proof', details: error.message }) 
    };
  }
};
