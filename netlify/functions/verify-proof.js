import { createClient } from '@supabase/supabase-js';
import { verifyZKProof } from '../../src/services/zk-circuit-service.js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { proofHash, proofType } = JSON.parse(event.body || '{}');

    if (!proofHash || !proofType) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing required fields' }) };
    }

    const { data: proofRecord, error } = await supabase
      .from('zk_proofs')
      .select('*')
      .eq('proof_hash', proofHash)
      .eq('proof_type', proofType)
      .single();

    if (error || !proofRecord) {
      return { statusCode: 404, body: JSON.stringify({ error: 'Proof not found' }) };
    }

    // Check if proof is expired
    if (proofRecord.expires_at && new Date(proofRecord.expires_at) < new Date()) {
      return { statusCode: 400, body: JSON.stringify({ valid: false, reason: 'Proof expired' }) };
    }

    // Check if proof is revoked
    if (proofRecord.is_revoked) {
      return { statusCode: 400, body: JSON.stringify({ valid: false, reason: 'Proof revoked' }) };
    }

    // Verify ZK proof using enhanced verification logic
    const zkProof = {
      proofHash: proofRecord.proof_hash,
      circuitType: proofRecord.proof_type,
      publicInputs: proofRecord.proof_data?.proofDetails || {},
      proof: {
        pi_a: [],
        pi_b: [],
        pi_c: [],
        protocol: 'groth16'
      },
      metadata: {
        circuitHash: proofRecord.proof_data?.proofDetails?.circuit_hash || '',
        provingKeyHash: '',
        verificationKeyHash: ''
      }
    };

    const isValid = await verifyZKProof(zkProof, { address: proofRecord.user_address });

    return {
      statusCode: 200,
      body: JSON.stringify({
        valid: isValid,
        userAddress: proofRecord.user_address,
        createdAt: proofRecord.created_at,
        expiresAt: proofRecord.expires_at,
        proofDetails: proofRecord.proof_data?.proofDetails
      })
    };
  } catch (error) {
    console.error('Error verifying proof:', error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to verify proof', details: error.message }) };
  }
};
