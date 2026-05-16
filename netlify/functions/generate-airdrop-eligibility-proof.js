import { createClient } from '@supabase/supabase-js';
import { getWalletData } from '../../src/services/xrpl-service.js';

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
    const walletData = await getWalletData(userAddress, false); // Use testnet for demo

    // Generate ZK proof hash (in production, this would use actual ZK circuits)
    const proofHash = `zk_airdrop_${userAddress.substring(0, 8)}_${Date.now()}`;
    
    // Real eligibility data based on blockchain data
    const eligibilityData = {
      walletAge: walletData.walletAge,
      transactionCount: walletData.transactionCount,
      holdsXRP: walletData.holdsXRP,
      xrpBalance: walletData.xrpBalance,
      isEligible: walletData.walletAge >= 30 && walletData.transactionCount >= 5 && walletData.holdsXRP
    };

    // Store proof in database
    const { error: dbError } = await supabase
      .from('zk_proofs')
      .insert({
        proof_hash: proofHash,
        proof_type: 'airdrop_eligibility',
        user_address: userAddress,
        user_did: userDid,
        proof_data: eligibilityData,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
      });

    if (dbError) {
      console.error('Database error:', dbError);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        proofHash,
        eligibilityData
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
