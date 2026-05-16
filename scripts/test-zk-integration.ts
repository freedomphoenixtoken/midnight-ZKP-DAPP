import { MidnightService } from '../src/services/midnight-service';
import { hashProof } from '../src/zk/proofs/proof-utils';

const midnightService = new MidnightService();

async function testComplianceProof() {
  console.log('Testing Compliance Proof Generation...');
  
  const input = {
    userDid: 'did:xrpl:test123',
    kycStatus: true,
    accreditationLevel: 2,
    verificationTimestamp: Date.now()
  };

  const proof = await midnightService.generateComplianceProof(input);
  const proofHash = hashProof(proof);
  
  console.log('✓ Compliance proof generated');
  console.log('  Proof hash:', proofHash);
  
  const isValid = await midnightService.verifyProof(proof, 'compliance');
  console.log('✓ Proof valid:', isValid);
  
  return { proof, proofHash, isValid };
}

async function testRentalTrustProof() {
  console.log('\nTesting Rental Trust Proof Generation...');
  
  const input = {
    userDid: 'did:xrpl:test456',
    totalRentals: 5,
    successfulRentals: 5,
    onTimeReturns: 5,
    lastRentalTimestamp: Date.now() - 86400000
  };

  const proof = await midnightService.generateRentalTrustProof(input);
  const proofHash = hashProof(proof);
  
  console.log('✓ Rental trust proof generated');
  console.log('  Proof hash:', proofHash);
  
  const isValid = await midnightService.verifyProof(proof, 'rental_trust');
  console.log('✓ Proof valid:', isValid);
  
  return { proof, proofHash, isValid };
}

async function runTests() {
  try {
    await testComplianceProof();
    await testRentalTrustProof();
    console.log('\n✓ All tests passed');
  } catch (error) {
    console.error('\n✗ Test failed:', error);
    process.exit(1);
  }
}

runTests();
