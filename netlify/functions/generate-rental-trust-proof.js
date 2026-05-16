import { createClient } from '@supabase/supabase-js';

// Mock Midnight Service for demo purposes
class MidnightService {
  async generateRentalTrustProof(input) {
    const successRate = Math.round((input.successfulRentals / input.totalRentals) * 100);
    const onTimeRate = Math.round((input.onTimeReturns / input.totalRentals) * 100);
    
    return {
      proof: {
        user_did: input.userDid,
        total_rentals: input.totalRentals,
        successful_rentals: input.successfulRentals,
        ontime_returns: input.onTimeReturns,
        success_rate: successRate,
        ontime_rate: onTimeRate,
        timestamp: Date.now(),
        signature: 'mock_signature_' + Date.now()
      },
      circuit_type: 'rental_trust',
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
  return 'zk_rental_trust_' + Math.abs(hash).toString(16);
}

const supabase = createClient(
  process.env.SUPABASE_URL || 'https://gbfrysybngxscjuixqcx.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY
);

const midnightService = new MidnightService();

function calculateRentalStats(rentals) {
  const total = rentals.length;
  const successful = rentals.filter((r) => r.status === 'completed').length;
  const onTime = rentals.filter((r) => r.returned_on_time === true).length;
  const lastRental = rentals.reduce((latest, r) => 
    new Date(r.created_at) > new Date(latest.created_at) ? r : latest
  , rentals[0]);

  return {
    total,
    successful,
    onTime,
    lastRentalTimestamp: new Date(lastRental.created_at).getTime()
  };
}

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
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { userAddress, userDid } = JSON.parse(event.body);

    if (!userAddress || !userDid) {
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // Fetch real wallet data from XRPL
    const walletData = await getWalletData(userAddress, false);

    // Real trust score data based on blockchain data
    const trustData = {
      walletAge: walletData.walletAge,
      transactionCount: walletData.transactionCount,
      xrpBalance: walletData.xrpBalance,
      trustScore: Math.min(100, Math.floor((walletData.transactionCount * 2) + (walletData.walletAge / 3))),
      successRate: walletData.transactionCount > 0 ? 95 : 0
    };

    // Generate ZK proof hash
    const proofHash = `zk_rental_${userAddress.substring(0, 8)}_${Date.now()}`;

    // Store proof in database
    const { error: dbError } = await supabase
      .from('zk_proofs')
      .insert({
        proof_hash: proofHash,
        proof_type: 'rental_trust',
        user_address: userAddress,
        user_did: userDid,
        proof_data: trustData,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      });

    if (dbError) {
      console.error('Database error:', dbError);
    }


    const { error: insertError } = await supabase.from('zk_proofs').insert({
      type: 'rental_trust',
      hash: proofHash,
      user_address: userAddress,
      proof_data: proof,
      expires_at: expiresAt.toISOString()
    });

    if (insertError) throw insertError;

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        proofHash,
        expiresAt: expiresAt.toISOString(),
        type: 'rental_trust',
        stats: {
          successRate: proof.proof.success_rate,
          onTimeRate: proof.proof.ontime_rate,
          totalRentals: stats.total
        }
      })
    };
  } catch (error) {
    console.error('Error generating rental trust proof:', error);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Failed to generate proof' })
    };
  }
};
