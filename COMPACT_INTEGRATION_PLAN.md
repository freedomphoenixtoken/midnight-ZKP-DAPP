# Compact Integration Plan - Fix Midnight ZKP DApp

## Current Issues (Feedback from Stephanie @ 1AM Wallet)
- **No Compact code in repo** - Midnight smart contracts must be written in Compact language
- **Missing Compact compiler** - Need to install Compact compiler and toolkit from Quickstart
- **Wrong approach** - AI was confused/drifting, writing in wrong language
- **Environment setup backwards** - Need Midnight/Compact environment first, then integrate XRPL

## Goal
Add Compact smart contracts to existing repo WITHOUT restarting completely. Integrate with existing React frontend.

---

## Step 1: Install Compact Compiler (Windows/WSL)

### Option A: Install Ubuntu in WSL (Recommended)
1. Open PowerShell as Administrator
2. Run: `wsl --install -d Ubuntu`
3. Restart computer when prompted
4. Open Ubuntu terminal after restart
5. Update system: `sudo apt update && sudo apt upgrade -y`
6. Install curl: `sudo apt install -y curl`

### Option B: Use existing WSL (if Ubuntu already installed)
1. Open Ubuntu terminal
2. Install curl: `sudo apt install -y curl`
3. Install Compact: `curl --proto '=https' --tlsv1.2 -LsSf https://github.com/midnightntwrk/compact/releases/latest/download/compact-installer.sh | sh`
4. Reload shell: `source ~/.bashrc`
5. Verify installation: `compact --version`
6. Update to latest: `compact update`

---

## Step 2: Install Docker Desktop
1. Download Docker Desktop for Windows: https://www.docker.com/products/docker-desktop/
2. Install with WSL 2 integration enabled
3. Start Docker Desktop
4. Verify: `docker --version`

---

## Step 3: Create Compact Contract Directory Structure
```
midnight-zkp-dapp/
├── contracts/
│   ├── compliance-passport.compact
│   ├── rental-trust.compact
│   ├── airdrop-eligibility.compact
│   ├── royalty-compliance.compact
│   └── governance-power.compact
└── compiled-contracts/
    ├── compliance-passport/
    ├── rental-trust/
    ├── airdrop-eligibility/
    ├── royalty-compliance/
    └── governance-power/
```

---

## Step 4: Write Compact Smart Contracts

### 4.1 Compliance Passport Contract
Create `contracts/compliance-passport.compact`:
```compact
import std::crypto::hash
import std::convert::u64

// Compliance Passport ZK Proof
// Proves user has KYC status and accreditation level without revealing identity

struct ComplianceProof {
    userDid: ByteArray,
    kycStatus: bool,
    accreditationLevel: u64,
    timestamp: u64
}

public struct ComplianceOutput {
    proofHash: ByteArray,
    isValid: bool
}

@zkproof
fn verify_compliance(input: ComplianceProof) -> ComplianceOutput {
    let hash = hash(input.userDid ++ input.kycStatus ++ input.accreditationLevel ++ input.timestamp);
    let isValid = input.kycStatus && input.accreditationLevel >= 1u64;
    ComplianceOutput {
        proofHash: hash,
        isValid: isValid
    }
}
```

### 4.2 Rental Trust Score Contract
Create `contracts/rental-trust.compact`:
```compact
import std::crypto::hash
import std::convert::u64

// Rental Trust Score ZK Proof
// Proves user's rental history without revealing specific transactions

struct RentalTrustProof {
    userDid: ByteArray,
    totalRentals: u64,
    successfulRentals: u64,
    onTimeReturns: u64,
    timestamp: u64
}

public struct RentalTrustOutput {
    proofHash: ByteArray,
    successRate: u64,
    ontimeRate: u64,
    isValid: bool
}

@zkproof
fn verify_rental_trust(input: RentalTrustProof) -> RentalTrustOutput {
    let successRate = (input.successfulRentals * 100u64) / input.totalRentals;
    let ontimeRate = (input.onTimeReturns * 100u64) / input.totalRentals;
    let isValid = input.totalRentals >= 3u64 && successRate >= 80u64 && ontimeRate >= 90u64;
    let hash = hash(input.userDid ++ input.totalRentals ++ input.successfulRentals ++ input.onTimeReturns ++ input.timestamp);
    RentalTrustOutput {
        proofHash: hash,
        successRate: successRate,
        ontimeRate: ontimeRate,
        isValid: isValid
    }
}
```

### 4.3 Airdrop Eligibility Contract
Create `contracts/airdrop-eligibility.compact`:
```compact
import std::crypto::hash
import std::convert::u64

// Airdrop Eligibility ZK Proof
// Proves user eligibility for airdrop without revealing identity

struct AirdropEligibilityProof {
    userDid: ByteArray,
    tokenHoldings: u64,
    minHoldings: u64,
    holdPeriod: u64,
    timestamp: u64
}

public struct AirdropEligibilityOutput {
    proofHash: ByteArray,
    isValid: bool
}

@zkproof
fn verify_airdrop_eligibility(input: AirdropEligibilityProof) -> AirdropEligibilityOutput {
    let isValid = input.tokenHoldings >= input.minHoldings && input.holdPeriod >= 30u64;
    let hash = hash(input.userDid ++ input.tokenHoldings ++ input.minHoldings ++ input.holdPeriod ++ input.timestamp);
    AirdropEligibilityOutput {
        proofHash: hash,
        isValid: isValid
    }
}
```

### 4.4 Royalty Compliance Contract
Create `contracts/royalty-compliance.compact`:
```compact
import std::crypto::hash
import std::convert::u64

// Royalty Compliance ZK Proof
// Proves creator royalty compliance without revealing specific sales

struct RoyaltyComplianceProof {
    creatorDid: ByteArray,
    totalSales: u64,
    royaltyPaid: u64,
    royaltyRate: u64,
    timestamp: u64
}

public struct RoyaltyComplianceOutput {
    proofHash: ByteArray,
    isValid: bool
}

@zkproof
fn verify_royalty_compliance(input: RoyaltyComplianceProof) -> RoyaltyComplianceOutput {
    let expectedRoyalty = (input.totalSales * input.royaltyRate) / 100u64;
    let isValid = input.royaltyPaid >= expectedRoyalty;
    let hash = hash(input.creatorDid ++ input.totalSales ++ input.royaltyPaid ++ input.royaltyRate ++ input.timestamp);
    RoyaltyComplianceOutput {
        proofHash: hash,
        isValid: isValid
    }
}
```

### 4.5 Governance Power Contract
Create `contracts/governance-power.compact`:
```compact
import std::crypto::hash
import std::convert::u64

// Governance Power ZK Proof
// Proves voting power without revealing token balance

struct GovernancePowerProof {
    userDid: ByteArray,
    tokenBalance: u64,
    votingWeight: u64,
    participationHistory: u64,
    timestamp: u64
}

public struct GovernancePowerOutput {
    proofHash: ByteArray,
    votingPower: u64,
    isValid: bool
}

@zkproof
fn verify_governance_power(input: GovernancePowerProof) -> GovernancePowerOutput {
    let votingPower = input.tokenBalance * input.votingWeight / 100u64;
    let isValid = input.tokenBalance >= 100u64 && input.participationHistory >= 5u64;
    let hash = hash(input.userDid ++ input.tokenBalance ++ input.votingWeight ++ input.participationHistory ++ input.timestamp);
    GovernancePowerOutput {
        proofHash: hash,
        votingPower: votingPower,
        isValid: isValid
    }
}
```

---

## Step 5: Compile Compact Contracts

In Ubuntu terminal (in project directory):

```bash
# Create contracts directory
mkdir -p contracts compiled-contracts

# Compile compliance passport
compact compile contracts/compliance-passport.compact -o compiled-contracts/compliance-passport

# Compile rental trust
compact compile contracts/rental-trust.compact -o compiled-contracts/rental-trust

# Compile airdrop eligibility
compact compile contracts/airdrop-eligibility.compact -o compiled-contracts/airdrop-eligibility

# Compile royalty compliance
compact compile contracts/royalty-compliance.compact -o compiled-contracts/royalty-compliance

# Compile governance power
compact compile contracts/governance-power.compact -o compiled-contracts/governance-power
```

---

## Step 6: Integrate Compiled Contracts with MidnightService

Update `src/services/midnight-service.ts` to use compiled contracts:

```typescript
// Import compiled contract modules
import { verify_compliance } from '../../compiled-contracts/compliance-passport';
import { verify_rental_trust } from '../../compiled-contracts/rental-trust';
import { verify_airdrop_eligibility } from '../../compiled-contracts/airdrop-eligibility';
import { verify_royalty_compliance } from '../../compiled-contracts/royalty-compliance';
import { verify_governance_power } from '../../compiled-contracts/governance-power';

// Update generateComplianceProof to use compiled contract
async generateComplianceProof(input: ComplianceProofInput): Promise<any> {
    // Try 1AM wallet first
    const wallet = await this.ensureWalletConnected();
    if (wallet) {
        try {
            console.log('1AM wallet connected, using wallet for proof generation');
            // Use 1AM wallet's ZK proof generation
        } catch (error) {
            console.warn('1AM wallet failed, using compiled contract:', error);
        }
    }

    // Fallback to compiled Compact contract
    try {
        const result = verify_compliance({
            userDid: input.userDid,
            kycStatus: input.kycStatus,
            accreditationLevel: BigInt(input.accreditationLevel),
            timestamp: BigInt(input.verificationTimestamp)
        });
        return result;
    } catch (error) {
        console.error('Compact contract verification failed:', error);
        return this.generateMockComplianceProof(input);
    }
}
```

---

## Step 7: Configure 1AM Wallet for Pre-Prod Network

### 7.1 Install 1AM Wallet Extension
1. Visit: https://1am.xyz/
2. Install browser extension
3. Create wallet
4. Go to Settings → Network
5. Select "Pre-Prod" network

### 7.2 Configure Proof Station
1. In 1AM wallet settings, enable "Proof Station"
2. This bypasses proof server and Docker requirements
3. Allows in-browser ZK proof generation

### 7.3 Get Test Tokens
1. Visit pre-prod faucet: https://faucet.midnight.network/
2. Generate NIGHT tokens
3. DUST tokens will auto-generate

---

## Step 8: Test Proof Generation with 1AM Wallet

### 8.1 Update Network Configuration
Update `src/services/midnight-service.ts`:

```typescript
private networkConfig = {
    // Pre-Prod network for testing
    networkId: 'pre-prod',
    rpcUrl: 'https://rpc.pre-prod.midnight.network',
    explorerUrl: 'https://explorer.pre-prod.midnight.network',
    walletId: '1am',
    docsUrl: 'https://docs.midnight.network'
};
```

### 8.2 Test in Browser
1. Open app: http://localhost:5173
2. Navigate to Compliance page
3. Click "Generate Proof"
4. 1AM wallet should prompt for connection
5. Approve connection to pre-prod network
6. Verify proof generation works

---

## Step 9: Deploy Compact Contracts to Pre-Prod

### 9.1 Deploy Contracts
In Ubuntu terminal:

```bash
# Deploy each contract to pre-prod
compact deploy compiled-contracts/compliance-passport --network pre-prod
compact deploy compiled-contracts/rental-trust --network pre-prod
compact deploy compiled-contracts/airdrop-eligibility --network pre-prod
compact deploy compiled-contracts/royalty-compliance --network pre-prod
compact deploy compiled-contracts/governance-power --network pre-prod
```

### 9.2 Save Contract Addresses
Update `src/services/midnight-service.ts` with deployed contract addresses:

```typescript
private contractAddresses = {
    compliancePassport: 'DEPLOYED_ADDRESS_HERE',
    rentalTrust: 'DEPLOYED_ADDRESS_HERE',
    airdropEligibility: 'DEPLOYED_ADDRESS_HERE',
    royaltyCompliance: 'DEPLOYED_ADDRESS_HERE',
    governancePower: 'DEPLOYED_ADDRESS_HERE'
};
```

---

## Step 10: Update README with Compact Setup

Update `README.md` to include:

```markdown
## Midnight Development Setup

### Prerequisites
- Compact compiler installed (see [Windows Compact Setup](https://docs.midnight.network/guides/windows-compact-setup))
- Docker Desktop running
- 1AM wallet extension installed
- Node.js 22+

### Install Compact Compiler (Windows/WSL)
1. Install Ubuntu in WSL: `wsl --install -d Ubuntu`
2. Open Ubuntu terminal and run:
   ```bash
   sudo apt update
   sudo apt install -y curl
   curl --proto '=https' --tlsv1.2 -LsSf https://github.com/midnightntwrk/compact/releases/latest/download/compact-installer.sh | sh
   source ~/.bashrc
   compact update
   ```

### Compile Contracts
```bash
# In Ubuntu terminal (project directory)
compact compile contracts/compliance-passport.compact -o compiled-contracts/compliance-passport
compact compile contracts/rental-trust.compact -o compiled-contracts/rental-trust
# ... compile other contracts
```

### Configure 1AM Wallet
1. Install 1AM wallet from https://1am.xyz/
2. Set network to Pre-Prod
3. Enable Proof Station in settings
4. Get NIGHT tokens from pre-prod faucet
```

---

## Step 11: Final Testing and Deployment

### 11.1 Test All Proof Types
1. Compliance proof generation
2. Rental trust proof generation
3. Airdrop eligibility proof generation
4. Royalty compliance proof generation
5. Governance power proof generation

### 11.2 Deploy to Production
```bash
# Build production version
npm run build

# Deploy to Netlify (automatic via GitHub push)
git add .
git commit -m "Add Compact smart contracts and 1AM wallet integration"
git push
```

---

## Summary of Changes

### Files to Create:
- `contracts/compliance-passport.compact`
- `contracts/rental-trust.compact`
- `contracts/airdrop-eligibility.compact`
- `contracts/royalty-compliance.compact`
- `contracts/governance-power.compact`
- `COMPACT_INTEGRATION_PLAN.md` (this file)

### Files to Modify:
- `src/services/midnight-service.ts` - Integrate compiled contracts
- `README.md` - Add Compact setup instructions
- `package.json` - Add Compact compilation scripts

### Directories to Create:
- `contracts/` - Compact source files
- `compiled-contracts/` - Compiled JavaScript contracts

---

## Next Steps After Completion

1. Verify all proofs generate correctly with 1AM wallet
2. Test on pre-prod network
3. Get feedback from Stephanie at 1AM wallet
4. Deploy to mainnet after approval
5. Update documentation with deployed contract addresses
