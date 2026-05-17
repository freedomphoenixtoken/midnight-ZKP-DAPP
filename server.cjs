const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8888;

app.use(cors());
app.use(express.json());

// Generate mock ZK proof
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

// Airdrop eligibility proof endpoint
app.post('/api/zk/generate-airdrop-eligibility-proof', (req, res) => {
  try {
    const { userAddress, userDid, tokenHoldings = 100, minHoldings = 10, holdPeriod = 30 } = req.body;
    
    if (!userAddress) {
      return res.status(400).json({ error: 'userAddress is required' });
    }

    const zkProof = generateMockProof(userAddress, 'airdrop_eligibility');
    const eligibilityData = {
      walletAge: holdPeriod,
      transactionCount: tokenHoldings,
      holdsXRP: true,
      xrpBalance: Math.floor(Math.random() * 1000) + 10,
      isEligible: tokenHoldings >= minHoldings && holdPeriod >= 30,
      proofDetails: zkProof,
      verificationCode: `ZK_VERIFY_${Date.now()}_${Math.random().toString(36).substring(7)}`
    };

    res.json({
      success: true,
      proofHash: zkProof.proofHash,
      eligibilityData,
      zkProof: {
        commitment: zkProof.publicInputs.commitment,
        nullifier: zkProof.publicInputs.nullifier,
        circuitHash: zkProof.metadata.circuitHash,
        verificationCode: eligibilityData.verificationCode
      }
    });
  } catch (error) {
    console.error('Error generating proof:', error);
    res.status(500).json({ error: 'Failed to generate proof', details: error.message });
  }
});

// Royalty compliance proof endpoint
app.post('/api/zk/generate-royalty-compliance-proof', (req, res) => {
  try {
    const { userAddress, userDid, totalSales = 100, royaltyPaid = 10, royaltyRate = 5 } = req.body;
    
    if (!userAddress) {
      return res.status(400).json({ error: 'userAddress is required' });
    }

    const zkProof = generateMockProof(userAddress, 'royalty_compliance');
    const complianceData = {
      transactionCount: totalSales,
      nftCount: royaltyPaid,
      isCompliant: royaltyPaid >= (totalSales * royaltyRate / 100),
      proofDetails: zkProof,
      verificationCode: `ZK_VERIFY_${Date.now()}_${Math.random().toString(36).substring(7)}`
    };

    res.json({
      success: true,
      proofHash: zkProof.proofHash,
      complianceData,
      zkProof: {
        commitment: zkProof.publicInputs.commitment,
        nullifier: zkProof.publicInputs.nullifier,
        circuitHash: zkProof.metadata.circuitHash,
        verificationCode: complianceData.verificationCode
      }
    });
  } catch (error) {
    console.error('Error generating proof:', error);
    res.status(500).json({ error: 'Failed to generate proof', details: error.message });
  }
});

// Governance power proof endpoint
app.post('/api/zk/generate-governance-power-proof', (req, res) => {
  try {
    const { userAddress, userDid, tokenBalance = 100, votingWeight = 10, participationHistory = 5 } = req.body;
    
    if (!userAddress) {
      return res.status(400).json({ error: 'userAddress is required' });
    }

    const zkProof = generateMockProof(userAddress, 'governance_power');
    const governanceData = {
      xrpBalance: tokenBalance,
      tokenHoldings: votingWeight,
      hasGovernancePower: tokenBalance >= 100 && participationHistory >= 5,
      proofDetails: zkProof,
      verificationCode: `ZK_VERIFY_${Date.now()}_${Math.random().toString(36).substring(7)}`
    };

    res.json({
      success: true,
      proofHash: zkProof.proofHash,
      governanceData,
      zkProof: {
        commitment: zkProof.publicInputs.commitment,
        nullifier: zkProof.publicInputs.nullifier,
        circuitHash: zkProof.metadata.circuitHash,
        verificationCode: governanceData.verificationCode
      }
    });
  } catch (error) {
    console.error('Error generating proof:', error);
    res.status(500).json({ error: 'Failed to generate proof', details: error.message });
  }
});

// Rental trust proof endpoint
app.post('/api/zk/generate-rental-trust-proof', (req, res) => {
  try {
    const { userAddress, userDid, totalRentals = 10, walletAge = 90, transactionCount = 20 } = req.body;
    
    if (!userAddress) {
      return res.status(400).json({ error: 'userAddress is required' });
    }

    const zkProof = generateMockProof(userAddress, 'rental_trust');
    const trustScore = Math.min(100, totalRentals * 5 + walletAge / 10);
    const trustData = {
      walletAge: walletAge,
      transactionCount: transactionCount,
      trustScore: trustScore,
      reliabilityScore: Math.min(100, trustScore + 10),
      proofDetails: zkProof,
      verificationCode: `ZK_VERIFY_${Date.now()}_${Math.random().toString(36).substring(7)}`
    };

    res.json({
      success: true,
      proofHash: zkProof.proofHash,
      trustData,
      zkProof: {
        commitment: zkProof.publicInputs.commitment,
        nullifier: zkProof.publicInputs.nullifier,
        circuitHash: zkProof.metadata.circuitHash,
        verificationCode: trustData.verificationCode
      }
    });
  } catch (error) {
    console.error('Error generating proof:', error);
    res.status(500).json({ error: 'Failed to generate proof', details: error.message });
  }
});

// Verify proof endpoint
app.post('/api/zk/verify-proof', (req, res) => {
  try {
    const { proofHash, proofType } = req.body;
    
    if (!proofHash || !proofType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const isValid = proofHash && proofHash.startsWith('zk_');

    res.json({
      valid: isValid,
      userAddress: 'mock_address',
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      verificationCode: `ZK_VERIFY_${Date.now()}_${Math.random().toString(36).substring(7)}`
    });
  } catch (error) {
    console.error('Error verifying proof:', error);
    res.status(500).json({ error: 'Failed to verify proof', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Local API server running on http://localhost:${PORT}`);
});
