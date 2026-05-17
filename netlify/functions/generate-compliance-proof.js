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
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { userAddress, userDid } = JSON.parse(event.body);

    if (!userAddress) {
      return { statusCode: 400, body: JSON.stringify({ error: 'userAddress is required' }) };
    }

    // Generate mock ZK proof for demo
    const zkProof = generateMockProof(userAddress, 'compliance_passport');

    // Mock compliance data
    const complianceData = {
      walletAge: Math.floor(Math.random() * 365) + 90,
      transactionCount: Math.floor(Math.random() * 200) + 20,
      isCompliant: true,
      proofDetails: zkProof
    };

    // Store proof in database
    const { error: dbError } = await supabase
      .from('zk_proofs')
      .insert({
        proof_hash: zkProof.proofHash,
        proof_type: 'compliance_passport',
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
