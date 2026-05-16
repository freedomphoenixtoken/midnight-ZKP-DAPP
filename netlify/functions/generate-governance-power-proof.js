const { createClient } = require('@supabase/supabase-js');

// Mock Midnight Service for demonstration
class MidnightService {
  async generateGovernancePowerProof(userAddress, userDid) {
    // Simulate proof generation
    const proofHash = `zk_governance_${userAddress.substring(0, 8)}_${Date.now()}`;
    
    // Mock governance data
    const governanceData = {
      votingPower: 1500,
      proposals: 23,
      participation: 87, // percentage
      hasVotingRights: true
    };
    
    return { proofHash, governanceData };
  }
}

const midnightService = new MidnightService();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { userAddress, userDid } = JSON.parse(event.body);

    if (!userAddress) {
      return { statusCode: 400, body: JSON.stringify({ error: 'userAddress is required' }) };
    }

    // Generate ZK proof
    const { proofHash, governanceData } = await midnightService.generateGovernancePowerProof(userAddress, userDid);

    // Store proof in database
    const { error: dbError } = await supabase
      .from('zk_proofs')
      .insert({
        proof_hash: proofHash,
        proof_type: 'governance_power',
        user_address: userAddress,
        user_did: userDid,
        proof_data: governanceData,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
      });

    if (dbError) {
      console.error('Database error:', dbError);
      // Continue even if database insert fails for demo purposes
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        proofHash,
        governanceData
      })
    };
  } catch (error) {
    console.error('Error generating proof:', error);
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: 'Failed to generate proof' }) 
    };
  }
};
