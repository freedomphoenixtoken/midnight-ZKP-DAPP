import { createClient } from '@supabase/supabase-js';

// Mock Midnight Service for demo purposes
class MidnightService {
  async generateComplianceProof(input) {
    return {
      proof: {
        user_did: input.userDid,
        kyc_status: input.kycStatus,
        accreditation_level: input.accreditationLevel,
        timestamp: input.verificationTimestamp,
        signature: 'mock_signature_' + Date.now()
      },
      circuit_type: 'compliance_passport',
      created_at: new Date().toISOString()
    };
  }

  async verifyProof(proof, circuitType) {
    return true; // Mock verification
  }
}

// Mock hash function for demo
function hashProof(proof) {
  const proofString = JSON.stringify(proof);
  let hash = 0;
  for (let i = 0; i < proofString.length; i++) {
    const char = proofString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return 'zk_compliance_' + Math.abs(hash).toString(16);
}

const supabase = createClient(
  process.env.SUPABASE_URL || 'https://gbfrysybngxscjuixqcx.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY
);

const midnightService = new MidnightService();

export const handler = async (event) => {
  // Enable CORS
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
    const { userAddress, userDid, kycStatus, accreditationLevel } = JSON.parse(event.body || '{}');

    if (!userAddress || !userDid || kycStatus === undefined || accreditationLevel === undefined) {
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    const proof = await midnightService.generateComplianceProof({
      userDid,
      kycStatus,
      accreditationLevel,
      verificationTimestamp: Date.now()
    });

    const proofHash = hashProof(proof);
    const expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

    const { error } = await supabase.from('zk_proofs').insert({
      type: 'compliance',
      hash: proofHash,
      user_address: userAddress,
      proof_data: proof,
      expires_at: expiresAt.toISOString()
    });

    if (error) throw error;

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        proofHash,
        expiresAt: expiresAt.toISOString(),
        type: 'compliance',
        accreditationLevel: proof.proof.accreditation_level
      })
    };
  } catch (error) {
    console.error('Error generating compliance proof:', error);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Failed to generate proof' })
    };
  }
};
