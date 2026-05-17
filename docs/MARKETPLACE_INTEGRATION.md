# XRPL Marketplace Integration Guide

This guide explains how XRPL marketplaces can integrate Midnight ZK proofs for privacy-preserving verification.

## Overview

The Midnight ZKP DApp allows users to generate privacy-preserving proofs about their XRPL holdings and activity. Marketplaces can verify these proofs without requiring users to expose sensitive financial data.

## Integration Options

### Option 1: Marketplace SDK (Recommended)

The easiest way to integrate is using our Marketplace SDK:

```typescript
import { MarketplaceSDK } from '@midnight-zkp/marketplace-sdk';

const sdk = new MarketplaceSDK();

// Verify a single proof
const isValid = await sdk.verifyProof(proofHash);
console.log('Proof valid:', isValid);

// Check user eligibility
const eligibility = await sdk.checkEligibility(xrplAddress, {
  requiresNftOwnership: true,
  minXrpBalance: 100,
  royaltyCompliance: true
});

if (eligibility.eligible) {
  console.log('User is eligible for premium features');
}
```

### Option 2: Direct API Integration

Marketplaces can also integrate directly with our verification API:

```typescript
// Verify a proof
const response = await fetch('https://api.midnight-zkp.com/v1/verify/{proofHash}');
const data = await response.json();

// Get all proofs for an address
const proofs = await fetch(`https://api.midnight-zkp.com/v1/address/{xrplAddress}/proofs`);
const proofsData = await proofs.json();
```

## Proof Types

The DApp supports the following proof types for XRPL marketplaces:

### 1. NFT Ownership Proof
- **Use Case**: Verify user owns specific NFTs without revealing portfolio
- **XRPL Transaction Type**: `NFTokenAcceptOffer`
- **Marketplace Use**: Eligibility for exclusive NFT drops, premium features

### 2. XRP Balance Proof
- **Use Case**: Verify minimum XRP balance without revealing exact holdings
- **XRPL Transaction Type**: `Payment` with memo
- **Marketplace Use**: Eligibility for high-value transactions, reduced fees

### 3. Transaction History Proof
- **Use Case**: Verify wallet activity without revealing transaction history
- **XRPL Transaction Type**: `AccountSet` with memo
- **Marketplace Use**: Sybil attack prevention, trust scoring

### 4. Royalty Compliance Proof
- **Use Case**: Verify royalty payments on NFT sales without revealing sales data
- **XRPL Transaction Type**: `Payment` with memo
- **Marketplace Use**: Royalty distribution, creator verification

### 5. Trust Line Proof
- **Use Case**: Verify trust line status for token trading
- **XRPL Transaction Type**: `TrustSet` with memo
- **Marketplace Use**: Token eligibility, trading permissions

## Verification Flow

1. **User generates proof** on Midnight network using the DApp
2. **Proof is signed with DUST** on Midnight network
3. **Proof is verified on XRPL** via transaction with proof hash in memo
4. **Marketplace verifies proof** using SDK or API
5. **Marketplace grants access** based on verified proof

## Example Integration Scenarios

### Scenario 1: Exclusive NFT Drop

```typescript
const sdk = new MarketplaceSDK();

// Check if user is eligible for exclusive drop
const eligibility = await sdk.checkEligibility(userAddress, {
  requiresNftOwnership: true,
  minXrpBalance: 100
});

if (eligibility.eligible) {
  // Grant access to exclusive drop
  await grantExclusiveDropAccess(userAddress);
} else {
  // Show requirements
  console.log('Missing requirements:', eligibility.missingRequirements);
}
```

### Scenario 2: Royalty Distribution

```typescript
const sdk = new MarketplaceSDK();

// Verify creator's royalty compliance
const proof = await sdk.verifyProof(creatorProofHash);

if (proof.isValid && proof.proofType === 'royalty_compliance') {
  // Distribute royalties
  await distributeRoyalties(creatorAddress, saleAmount);
}
```

### Scenario 3: Reduced Fee Eligibility

```typescript
const sdk = new MarketplaceSDK();

// Check if user qualifies for reduced fees
const balanceProof = await sdk.verifyProof(userBalanceProofHash);

if (balanceProof.isValid && balanceProof.proofData.balance >= 1000) {
  // Apply reduced fee
  const fee = calculateReducedFee(transactionAmount);
}
```

## Security Considerations

1. **Proof Expiration**: Proofs expire after 24 hours for security
2. **Address Validation**: Always validate XRPL addresses before verification
3. **Proof Hash Validation**: Verify proof hash format before API calls
4. **Rate Limiting**: API has rate limiting to prevent abuse
5. **Proof Uniqueness**: Each proof can only be used once

## API Endpoints

### Verify Proof
```
GET /v1/verify/{proofHash}
```

### Batch Verify
```
POST /v1/verify/batch
Body: { proofHashes: string[] }
```

### Get Proofs for Address
```
GET /v1/address/{xrplAddress}/proofs
```

### Check Eligibility
```
POST /v1/eligibility
Body: { xrplAddress, requirements }
```

## Error Handling

```typescript
try {
  const isValid = await sdk.verifyProof(proofHash);
} catch (error) {
  if (error.message.includes('expired')) {
    // Proof expired, ask user to regenerate
  } else if (error.message.includes('invalid')) {
    // Invalid proof hash
  } else {
    // API error
  }
}
```

## Testing

Use the testnet environment for development:
```typescript
const sdk = new MarketplaceSDK('https://testnet-api.midnight-zkp.com/v1');
```

## Support

For integration support, contact:
- GitHub: https://github.com/freedomphoenixtoken/midnight-ZKP-DAPP
- Discord: https://discord.com/invite/midnightnetwork

## Privacy Guarantees

- Proofs reveal zero knowledge about actual values
- Only verification status is exposed
- No financial data is shared with marketplaces
- Users maintain full control of their data
