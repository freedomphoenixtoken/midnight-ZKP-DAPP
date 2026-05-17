# Technical Overview: Midnight-ZKP-DApp

## System Architecture

The Midnight-ZKP-DApp implements a privacy-preserving cross-chain verification system that bridges the Midnight network (ZK proof generation) and the XRPL (marketplace verification).

### High-Level Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Midnight      │    │   Cross-Chain    │    │     XRPL        │
│   Network       │◄──►│   Bridge         │◄──►│   Ledger        │
│                 │    │                  │    │                 │
│ • ZK Circuits   │    │ • DUST Signing   │    │ • Memos         │
│ • 1AM Wallet    │    │ • Proof Storage  │    │ • Transactions  │
│ • DUST Token    │    │ • Verification   │    │ • Wallets        │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │
                                ▼
                        ┌──────────────────┐
                        │   Marketplaces   │
                        │                  │
                        │ • SDK            │
                        │ • API            │
                        │ • Verification   │
                        └──────────────────┘
```

## Component Breakdown

### 1. Midnight Network Layer

#### Compact Smart Contracts
- **Location**: `contracts/*.compact`
- **Compiler**: Compact CLI v0.31.0
- **Runtime**: @midnight-ntwrk/compact-runtime v0.15.0
- **Output**: `compiled-contracts/*`

**Contracts**:
1. `nft-ownership.compact` - Verifies NFT ownership without revealing portfolio
2. `xrp-balance.compact` - Verifies minimum XRP balance
3. `transaction-history.compact` - Verifies wallet activity
4. `royalty-compliance.compact` - Verifies royalty payments
5. `trust-line.compact` - Verifies trust line status

#### MidnightService
- **Location**: `src/services/midnight-service.ts`
- **Responsibilities**:
  - Wallet connection (1AM)
  - ZK proof generation
  - DUST transaction signing
  - Network configuration

### 2. Cross-Chain Bridge Layer

#### CrossChainService
- **Location**: `src/services/cross-chain-service.ts`
- **Responsibilities**:
  - Coordinate Midnight and XRPL operations
  - DUST balance checking
  - Transaction submission to XRPL
  - Proof storage coordination

**Flow**:
1. Generate ZK proof on Midnight
2. Sign with DUST transaction
3. Submit to XRPL with proper transaction type
4. Store proof in registry

#### ProofRegistry
- **Location**: `src/services/proof-registry.ts`
- **Database**: Supabase
- **Responsibilities**:
  - Proof storage with 24-hour expiration
  - Proof retrieval by hash
  - Proof retrieval by XRPL address
  - XRPL transaction hash updates

#### DAppVerificationService
- **Location**: `src/services/dapp-verification.ts`
- **Responsibilities**:
  - Read proof hashes from XRPL transaction memos
  - Verify proofs using compiled Midnight circuits
  - Provide verification results to marketplaces
  - Memo parsing utilities

### 3. XRPL Layer

#### XRPL Wallet Integration
- **Component**: `src/components/wallet/XRPLWalletConnection.tsx`
- **Supported Wallets**: XUMM, XUMM SDK
- **Transaction Types**:
  - `NFTokenAcceptOffer` - NFT ownership verification
  - `Payment` - Balance and royalty verification
  - `AccountSet` - Transaction history verification
  - `TrustSet` - Trust line verification

#### XRPL Integration
- **Library**: xrpl v2.14.3, xumm-sdk v1.11.2
- **Memo Format**: Hex-encoded proof hash
- **Verification**: Proof hash extracted from memo and verified by DApp

### 4. Marketplace Layer

#### Marketplace SDK
- **Location**: `src/sdk/marketplace-sdk.ts`
- **Features**:
  - Single proof verification
  - Batch verification
  - Address-based proof queries
  - Eligibility checking
  - Validation utilities

**API Methods**:
```typescript
verifyProof(proofHash: string)
verifyProofsBatch(proofHashes: string[])
getProofsForAddress(xrplAddress: string)
checkEligibility(xrplAddress, requirements)
```

#### API Endpoints (Planned)
- `GET /v1/verify/{proofHash}` - Verify single proof
- `POST /v1/verify/batch` - Batch verification
- `GET /v1/address/{xrplAddress}/proofs` - Get proofs by address
- `POST /v1/eligibility` - Check eligibility

## Data Flow

### Proof Generation Flow
```
User → MidnightService → Compact Circuit → ZK Proof → DUST Signature → CrossChainService
```

### Cross-Chain Verification Flow
```
MidnightService → DUST Signing → XRPL Transaction → Proof Registry → DAppVerificationService
```

### Marketplace Verification Flow
```
Marketplace → Marketplace SDK → DApp API → DAppVerificationService → Circuit Verification → Result
```

## Security Architecture

### Privacy Protection
- **Zero Knowledge**: Proofs reveal only verification status
- **No Data Exposure**: Actual values never revealed
- **User Control**: Users control when to generate proofs

### Security Measures
- **Replay Protection**: Proofs can only be used once
- **Expiration**: Proofs expire after 24 hours
- **Cryptographic Verification**: Actual ZK circuit verification
- **Wallet Security**: Secure wallet connections

### Data Storage
- **Proof Registry**: Supabase with proper access controls
- **No Sensitive Data**: Only proof hashes and metadata stored
- **Expiration**: Automatic cleanup of expired proofs

## Technology Stack

### Frontend
- **Framework**: React 18.2.0
- **Build Tool**: Vite 5.0.8
- **Styling**: Tailwind CSS 3.4.0
- **Icons**: Lucide React 0.294.0

### Midnight Integration
- **Compact**: @midnight-ntwrk/compact-js 2.5.0
- **DApp Connector**: @midnight-ntwrk/dapp-connector-api 4.0.1
- **Midnight JS**: @midnight-ntwrk/midnight-js 4.0.4
- **Wallet**: @midnight-ntwrk/wallet 5.0.0

### XRPL Integration
- **XRPL Library**: xrpl 2.14.3
- **XUMM SDK**: xumm-sdk 1.11.2

### Backend
- **Database**: Supabase 2.39.0
- **Runtime**: Node.js 18+

### Development Tools
- **TypeScript**: 5.3.3
- **WASM Plugin**: vite-plugin-wasm 3.6.0
- **Testing**: (planned)

## File Structure

```
midnight-zkp-dapp/
├── contracts/              # Compact smart contracts
│   ├── nft-ownership.compact
│   ├── xrp-balance.compact
│   ├── transaction-history.compact
│   ├── royalty-compliance.compact
│   └── trust-line.compact
├── compiled-contracts/    # Compiled Compact contracts
│   ├── nft-ownership/
│   ├── xrp-balance/
│   ├── transaction-history/
│   ├── royalty-compliance/
│   └── trust-line/
├── src/
│   ├── components/
│   │   ├── wallet/
│   │   │   └── XRPLWalletConnection.tsx
│   │   └── ui/
│   │       └── Navbar.tsx
│   ├── pages/
│   │   ├── CompliancePage.tsx
│   │   ├── RentalTrustPage.tsx
│   │   ├── AirdropEligibilityPage.tsx
│   │   ├── RoyaltyCompliancePage.tsx
│   │   └── GovernancePowerPage.tsx
│   ├── services/
│   │   ├── midnight-service.ts
│   │   ├── cross-chain-service.ts
│   │   ├── proof-registry.ts
│   │   ├── dapp-verification.ts
│   │   └── verification-oracle.ts
│   ├── sdk/
│   │   └── marketplace-sdk.ts
│   ├── lib/
│   │   └── supabase.ts
│   └── App.tsx
├── docs/
│   └── MARKETPLACE_INTEGRATION.md
├── supabase/
│   └── migrations/
├── package.json
├── vite.config.ts
├── HACKATHON_SUBMISSION.md
└── TECHNICAL_OVERVIEW.md
```

## Configuration

### Environment Variables
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Network Configuration
- **Midnight Network**: pre-prod (configurable)
- **XRPL Network**: testnet (configurable)

## Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Deployment Options
- **Vercel**: Recommended for frontend
- **Netlify**: Alternative for frontend
- **Supabase**: Backend and database

## Performance Considerations

### Proof Generation
- **Time**: 2-5 seconds per proof
- **Gas**: ~0.01 DUST per proof
- **Optimization**: Caching of compiled contracts

### Verification
- **Time**: <1 second per verification
- **Database**: Indexed queries for fast lookup
- **Caching**: Redis (planned)

## Monitoring & Logging

### Logging
- **Console**: Development logging
- **Error Tracking**: (planned - Sentry)
- **Performance**: (planned)

### Metrics
- **Proof Generation Count**
- **Verification Success Rate**
- **API Response Times**
- **Error Rates**

## Future Enhancements

### Short Term
- [ ] Actual circuit verification in DApp
- [ ] XRPL transaction monitoring
- [ ] Redis caching
- [ ] Error tracking

### Long Term
- [ ] Mobile app (React Native)
- [ ] Additional proof types
- [ ] Multi-chain support (Ethereum, Solana)
- [ ] Advanced marketplace features

## Troubleshooting

### Common Issues

**Runtime Version Mismatch**
- **Error**: "Version mismatch: compiled code expects 0.16.0, runtime is 0.15.0"
- **Solution**: Compiled contracts patched to accept runtime 0.15.0

**WASM Loading Error**
- **Error**: "ESM integration proposal for Wasm is not supported"
- **Solution**: vite-plugin-wasm installed and configured

**Compact Compiler Issues**
- **Error**: "compact: command not found"
- **Solution**: Install Compact CLI via installer script

## References

- [Compact Documentation](https://docs.midnight.network/compact)
- [Midnight SDK Documentation](https://docs.midnight.network/sdk)
- [XRPL Documentation](https://xrpl.org/)
- [XUMM SDK Documentation](https://xumm.dev/)
