# Midnight ZKP DApp

A standalone Zero-Knowledge Proof (ZKP) decentralized application for privacy-preserving compliance and rental trust verification on the XRPL ecosystem.

## Features

### ZK-Compliance Passport
- Prove KYC/accreditation status without revealing personal identity
- Required for RWA (Real World Asset) purchases
- Privacy-preserving verification using Midnight ZK circuits (mock implementation)

### ZK-Rental Trust Score
- Prove rental reliability without revealing rental history
- Required for NFT rental requests
- Calculates success rate and on-time return rate using ZK proofs (mock implementation)

## Tech Stack

- **Frontend**: React 18 + Vite + TypeScript + Tailwind CSS
- **Backend**: Netlify Functions (serverless)
- **Database**: Supabase (PostgreSQL)
- **Blockchain**: XRPL (XRP Ledger)
- **ZK Proofs**: Midnight Network (Compact DSL) - Mock mode for demo
- **Icons**: Lucide React

## Setup

### Prerequisites

- Node.js 18+
- Supabase account
- XRPL testnet account (optional for demo)

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Copy environment variables:
```bash
cp .env.example .env
```

4. Update `.env` with your actual values:
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- VITE_XRPL_NETWORK (testnet/mainnet)
- VITE_XRPL_SERVER

### Database Setup

Run the migration in Supabase SQL editor:
```sql
-- Copy contents from supabase/migrations/20240516_initial_schema.sql
```

Or use the MCP tool if configured.

### Circuit Compilation (Optional)

The Midnight SDK is not yet publicly available on npm, so circuit compilation is optional for the demo. The mock implementation in `midnight-service.ts` will work without compiled circuits.

When Midnight SDK becomes available:
```bash
npm run compile:circuits
```

## Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## API Endpoints

### Generate Compliance Proof
```
POST /api/zk/generate-compliance-proof
Content-Type: application/json

{
  "userAddress": "r...",
  "userDid": "did:xrpl:r...",
  "kycStatus": true,
  "accreditationLevel": 2
}
```

### Generate Rental Trust Proof
```
POST /api/zk/generate-rental-trust-proof
Content-Type: application/json

{
  "userAddress": "r...",
  "userDid": "did:xrpl:r..."
}
```

### Verify Proof
```
POST /api/zk/verify-proof
Content-Type: application/json

{
  "proofHash": "zk_compliance_...",
  "proofType": "compliance"
}
```

## Testing

Run the ZK integration tests:
```bash
npm run test:zk
```

Seed demo data:
```bash
npm run seed:demo
```

## Deployment

### Build
```bash
npm run build
```

### Deploy to Netlify
```bash
netlify deploy --prod
```

### Environment Variables in Netlify
1. Go to Netlify dashboard
2. Navigate to Site Settings > Environment Variables
3. Add all environment variables from `.env`
4. Redeploy

## Marketplace Integration

This dApp can be integrated into your existing marketplace in multiple ways:

### 1. Iframe Embedding
```html
<iframe
    src="https://your-dapp-url.netlify.app/compliance"
    width="100%"
    height="600"
    frameborder="0"
    allow="clipboard-write"
></iframe>
```

### 2. API Integration
```typescript
const response = await fetch('https://your-dapp-url.netlify.app/api/zk/generate-compliance-proof', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        userAddress: walletAddress,
        userDid: `did:xrpl:${walletAddress}`,
        kycStatus: true,
        accreditationLevel: 2
    })
});

const { proofHash } = await response.json();
```

### 3. Widget Component
For React-based marketplaces, use the `ZKPWidget` component:
```typescript
import { ZKPWidget } from './components/ZKPWidget';

<ZKPWidget 
    userAddress={walletAddress}
    type="compliance"
    onProofGenerated={(hash) => console.log('Proof generated:', hash)}
    apiUrl="https://your-dapp-url.netlify.app/api/zk"
/>
```

## Architecture

### Frontend Structure
- `src/pages/` - Page components (Home, Compliance, RentalTrust, Verification)
- `src/components/ui/` - UI components (Navbar)
- `src/components/zk/` - ZK-specific components (CompliancePassport, RentalTrustScore, ZKPWidget)
- `src/services/` - Service layer (MidnightService, XRPLService)
- `src/zk/circuits/` - Midnight ZK circuits (Compact DSL)
- `src/zk/proofs/` - Proof utilities

### Backend Structure
- `netlify/functions/api/zk/` - Serverless functions for ZK operations
  - `generate-compliance-proof.ts`
  - `generate-rental-trust-proof.ts`
  - `verify-proof.ts`

### Database Schema
- `zk_proofs` - Stores generated ZK proofs
- `rentals` - Stores rental history for trust score calculation

## Security

- Row Level Security (RLS) enabled on Supabase tables
- Service role keys only used in Netlify functions
- Proof hashes stored with expiration dates
- CORS configured for cross-origin requests

## License

MIT

## Acknowledgments

- Midnight Network for ZK proof infrastructure
- Supabase for backend database
- XRPL for blockchain integration
