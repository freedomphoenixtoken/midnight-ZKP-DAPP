# Midnight ZKP DApp

**Privacy-Preserving Cross-Chain Verification for XRPL Marketplaces** 🏆

A Zero-Knowledge Proof (ZKP) decentralized application that enables XRPL marketplaces to verify user credentials using proofs generated on the Midnight network. Users can prove ownership of NFTs, XRP balance, transaction history, royalty compliance, and trust line status without revealing sensitive financial data.

## 🚀 Features

### Privacy-Preserving ZK Proofs
- **NFT Ownership Proof** - Prove NFT ownership without revealing portfolio
- **XRP Balance Proof** - Verify minimum XRP balance without revealing exact holdings
- **Transaction History Proof** - Prove wallet activity without revealing transaction history
- **Royalty Compliance Proof** - Verify royalty payments without exposing sales data
- **Trust Line Proof** - Verify trust line status for token trading

### Cross-Chain Integration
- **Midnight to XRPL Bridge** - Proofs generated on Midnight, verified on XRPL
- **DUST Transaction Signing** - Uses Midnight's native token for proof attestation
- **XRPL Transaction Types** - Proper transaction types (NFTokenAcceptOffer, Payment, AccountSet, TrustSet)
- **Memo-Based Verification** - Proof hashes embedded in XRPL transaction memos

### Marketplace Integration
- **DApp-Based Verification** - The DApp verifies proofs from XRPL transaction memos
- **Marketplace SDK** - Complete TypeScript SDK for marketplace integration
- **API Endpoints** - REST API for proof verification queries
- **Eligibility Checking** - Batch verification and requirement checking

### Privacy Preservation
- **Zero Knowledge Revealed** - Proofs reveal only verification status, not actual values
- **No Financial Data Exposure** - Marketplaces only receive proof validity, not holdings
- **User Control** - Users maintain full control of their data
- **Replay Protection** - Proofs can only be used once
- **Proof Expiration** - Proofs expire after 24 hours

## 🛠️ Tech Stack

### Frontend
- **React 18.2.0** - UI framework
- **Vite 5.0.8** - Build tool
- **TypeScript 5.3.3** - Type safety
- **Tailwind CSS 3.4.0** - Styling
- **Lucide React** - Icons

### Midnight Integration
- **Compact 0.31.0** - ZK circuit compiler
- **@midnight-ntwrk/compact-js 2.5.0** - Compact runtime
- **@midnight-ntwrk/dapp-connector-api 4.0.1** - Wallet connection
- **@midnight-ntwrk/midnight-js 4.0.4** - Midnight SDK
- **@midnight-ntwrk/wallet 5.0.0** - Wallet integration

### XRPL Integration
- **xrpl 2.14.3** - XRPL library
- **xumm-sdk 1.11.2** - XUMM wallet

### Backend
- **Supabase 2.39.0** - Database and auth
- **Node.js 18+** - Runtime

### Development Tools
- **vite-plugin-wasm 3.6.0** - WebAssembly support

## 📦 Installation

### Prerequisites
- Node.js 18+
- WSL (for Compact compiler)
- Midnight 1AM Wallet
- XRPL Wallet (XUMM or compatible)

### Setup

```bash
# Clone repository
git clone https://github.com/freedomphoenixtoken/midnight-ZKP-DAPP.git
cd midnight-ZKP-DAPP

# Install dependencies
npm install

# Install vite-plugin-wasm
npm install vite-plugin-wasm --save-dev

# Compile Compact contracts
npm run compile:contracts

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📖 Documentation

- **[HACKATHON_SUBMISSION.md](HACKATHON_SUBMISSION.md)** - Hackathon submission details
- **[TECHNICAL_OVERVIEW.md](TECHNICAL_OVERVIEW.md)** - Technical architecture
- **[docs/MARKETPLACE_INTEGRATION.md](docs/MARKETPLACE_INTEGRATION.md)** - Marketplace integration guide
- **[DETAILED_SETUP_GUIDE.md](DETAILED_SETUP_GUIDE.md)** - Complete setup instructions

## 🔗 Compact Smart Contracts

All contracts are written in the Compact language and compiled for the Midnight network:

- **nft-ownership.compact** - NFT ownership verification
- **xrp-balance.compact** - XRP balance verification
- **transaction-history.compact** - Transaction history verification
- **royalty-compliance.compact** - Royalty compliance verification
- **trust-line.compact** - Trust line verification

## 🌐 Marketplace Integration

Marketplaces can integrate verification using our SDK:

```typescript
import { MarketplaceSDK } from '@midnight-zkp/marketplace-sdk';

const sdk = new MarketplaceSDK('https://your-dapp-url.com');

// Verify a proof
const isValid = await sdk.verifyProof(proofHash);

// Check eligibility
const eligibility = await sdk.checkEligibility(xrplAddress, {
  requiresNftOwnership: true,
  minXrpBalance: 100
});
```

See [docs/MARKETPLACE_INTEGRATION.md](docs/MARKETPLACE_INTEGRATION.md) for complete integration guide.

## 🚀 Usage

### For Users

1. Connect 1AM wallet (Midnight)
2. Connect XRPL wallet
3. Select proof type
4. Generate ZK proof
5. Sign with DUST transaction
6. Submit to XRPL
7. Share proof hash with marketplace

### For Marketplaces

1. Query DApp API with proof hash from XRPL transaction memo
2. DApp verifies proof using compiled Midnight circuits
3. Receive verification result

## 🔒 Security

- **Replay Protection**: Proofs can only be used once
- **Expiration**: Proofs expire after 24 hours
- **Cryptographic Verification**: Uses actual ZK circuit verification
- **No Data Exposure**: Only verification status revealed

## 📝 License

MIT License

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 📧 Contact

- **GitHub**: https://github.com/freedomphoenixtoken/midnight-ZKP-DAPP
- **Team**: FreedomPhoenixToken
