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
    const { userAddress, userDid, tokenHoldings = 100, minHoldings = 10, holdPeriod = 30 } = JSON.parse(body);

    if (!userAddress) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'userAddress is required' }) };
    }

    // Generate mock ZK proof for demo
    const zkProof = generateMockProof(userAddress, 'airdrop_eligibility');

    // Mock eligibility data with verification code for XRPL
    const eligibilityData = {
      walletAge: holdPeriod,
      transactionCount: tokenHoldings,
      holdsXRP: true,
      xrpBalance: Math.floor(Math.random() * 1000) + 10,
      isEligible: tokenHoldings >= minHoldings && holdPeriod >= 30,
      proofDetails: zkProof,
      verificationCode: `ZK_VERIFY_${Date.now()}_${Math.random().toString(36).substring(7)}`
    };

    // Store proof in database
    try {
      const { error: dbError } = await supabase
        .from('zk_proofs')
        .insert({
          proof_hash: zkProof.proofHash,
          proof_type: 'airdrop_eligibility',
          user_address: userAddress,
          user_did: userDid || userAddress,
          proof_data: eligibilityData,
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
        eligibilityData,
        zkProof: {
          commitment: zkProof.publicInputs.commitment,
          nullifier: zkProof.publicInputs.nullifier,
          circuitHash: zkProof.metadata.circuitHash,
          verificationCode: eligibilityData.verificationCode
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
