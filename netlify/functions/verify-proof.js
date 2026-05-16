import { createClient } from '@supabase/supabase-js';

// Mock Midnight Service for demo purposes
class MidnightService {
  async verifyProof(proof, circuitType) {
    return true; // Mock verification
  }
}

// Mock isProofExpired function
function isProofExpired(expiresAt) {
  if (!expiresAt) return false;
  return new Date(expiresAt) < new Date();
}

const supabase = createClient(
  process.env.SUPABASE_URL || 'https://gbfrysybngxscjuixqcx.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY
);

const midnightService = new MidnightService();

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  try {
    const { proofHash, proofType } = JSON.parse(event.body || '{}');

    if (!proofHash || !proofType) {
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    const { data: proofRecord, error } = await supabase
      .from('zk_proofs')
      .select('*')
      .eq('hash', proofHash)
      .eq('type', proofType)
      .single();

    if (error || !proofRecord) {
      return {
        statusCode: 404,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Proof not found' })
      };
    }

    if (isProofExpired(proofRecord.expires_at ? new Date(proofRecord.expires_at) : null) || proofRecord.is_revoked) {
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ valid: false, reason: 'Proof expired or revoked' })
      };
    }

    const isValid = await midnightService.verifyProof(proofRecord.proof_data, proofType);

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        valid: isValid,
        userAddress: proofRecord.user_address,
        createdAt: proofRecord.created_at,
        expiresAt: proofRecord.expires_at
      })
    };
  } catch (error) {
    console.error('Error verifying proof:', error);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Failed to verify proof' })
    };
  }
};
