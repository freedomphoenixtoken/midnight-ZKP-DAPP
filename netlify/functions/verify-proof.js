import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Mock ZK proof verification for demo
function verifyMockProof(proofHash) {
  // In production, this would use the actual Midnight circuit verification
  // For demo, we'll just check if the proof hash exists and is valid format
  return proofHash && proofHash.startsWith('zk_');
}

export const handler = async (event) => {
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
    const { proofHash, proofType } = JSON.parse(body);

    if (!proofHash || !proofType) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing required fields' }) };
    }

    const { data: proofRecord, error } = await supabase
      .from('zk_proofs')
      .select('*')
      .eq('proof_hash', proofHash)
      .eq('proof_type', proofType)
      .single();

    if (error || !proofRecord) {
      return { statusCode: 404, headers, body: JSON.stringify({ error: 'Proof not found' }) };
    }

    // Check if proof is expired
    if (proofRecord.expires_at && new Date(proofRecord.expires_at) < new Date()) {
      return { statusCode: 400, headers, body: JSON.stringify({ valid: false, reason: 'Proof expired' }) };
    }

    // Check if proof is revoked
    if (proofRecord.is_revoked) {
      return { statusCode: 400, headers, body: JSON.stringify({ valid: false, reason: 'Proof revoked' }) };
    }

    // Verify ZK proof using mock verification
    const isValid = verifyMockProof(proofRecord.proof_hash);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        valid: isValid,
        userAddress: proofRecord.user_address,
        createdAt: proofRecord.created_at,
        expiresAt: proofRecord.expires_at,
        proofDetails: proofRecord.proof_data?.proofDetails,
        verificationCode: proofRecord.proof_data?.verificationCode
      })
    };
  } catch (error) {
    console.error('Error verifying proof:', error);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Failed to verify proof', details: error.message }) };
  }
};
