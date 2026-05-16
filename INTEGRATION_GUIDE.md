# Marketplace Integration Guide

This guide explains how to integrate the Midnight ZKP DApp into your existing XRPL NFT marketplace.

## Integration Options

### Option 1: Iframe Embedding (Simplest)

Embed the dApp directly into your marketplace using an iframe:

```html
<iframe
    src="https://your-dapp-url.netlify.app/compliance"
    width="100%"
    height="600"
    frameborder="0"
    allow="clipboard-write"
></iframe>
```

**Pros:**
- Simplest implementation
- Works with any frontend framework
- No code changes required in your marketplace

**Cons:**
- Limited control over styling
- Requires user to leave your marketplace context
- PostMessage communication needed for proof hash

**When to use:**
- Quick integration for demo or MVP
- Marketplace built with frameworks that don't support React

---

### Option 2: API Integration (Most Flexible)

Call the dApp API directly from your marketplace:

```typescript
// Generate compliance proof
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

const { proofHash, expiresAt } = await response.json();

// Use proof hash in XRPL transaction
const xrplResponse = await submitNFTTransactionWithProof(proofHash);
```

**Pros:**
- Full control over UI/UX
- Seamless integration with existing flow
- Can customize the experience

**Cons:**
- Requires API key configuration
- Need to handle CORS if different domains

**When to use:**
- Production-ready integration
- Custom UI requirements
- Need tight integration with marketplace flow

---

### Option 3: PostMessage Communication

Use postMessage for iframe communication:

```typescript
// In your marketplace
const iframe = document.getElementById('zkp-dapp-iframe');
iframe.contentWindow.postMessage({
    type: 'GENERATE_COMPLIANCE_PROOF',
    userAddress: walletAddress
}, 'https://your-dapp-url.netlify.app');

// Listen for proof hash
window.addEventListener('message', (event) => {
    if (event.data.type === 'PROOF_GENERATED') {
        console.log('Proof hash:', event.data.proofHash);
    }
});

// In dApp (add to index.html or App.tsx)
window.addEventListener('message', (event) => {
    if (event.data.type === 'GENERATE_COMPLIANCE_PROOF') {
        // Generate proof and send back
        generateProof(event.data.userAddress).then(proofHash => {
            event.source.postMessage({
                type: 'PROOF_GENERATED',
                proofHash
            }, event.origin);
        });
    }
});
```

**Pros:**
- Secure cross-origin communication
- Keeps dApp isolated
- Good for security-sensitive applications

**Cons:**
- More complex implementation
- Need to handle message routing

**When to use:**
- Security requirements demand isolation
- Want to keep dApp as separate deployment

---

### Option 4: React Widget Component (Best for React Marketplaces)

Use the `ZKPWidget` component directly in your React marketplace:

```typescript
import { ZKPWidget } from 'midnight-zkp-dapp/src/components/ZKPWidget';

function ComplianceSection({ walletAddress }) {
    const handleProofGenerated = (proofHash) => {
        // Use proof hash in your marketplace
        console.log('Proof generated:', proofHash);
        
        // Submit to your backend or use in XRPL transaction
        submitWithProof(proofHash);
    };

    return (
        <ZKPWidget 
            userAddress={walletAddress}
            type="compliance"
            onProofGenerated={handleProofGenerated}
            apiUrl="https://your-dapp-url.netlify.app/api/zk"
        />
    );
}
```

**Installation:**
1. Copy `src/components/ZKPWidget.tsx` to your marketplace
2. Ensure dependencies are installed:
   - lucide-react
   - react

**Pros:**
- Native React integration
- Full styling control
- Type-safe with TypeScript

**Cons:**
- Only works with React marketplaces
- Need to maintain component updates

**When to use:**
- Marketplace built with React
- Want full control over component styling
- Plan to customize the widget

---

## Step-by-Step Integration

### Step 1: Deploy the DApp

1. Build the dApp:
```bash
npm run build
```

2. Deploy to Netlify:
```bash
netlify deploy --prod
```

3. Note the deployed URL (e.g., `https://your-dapp.netlify.app`)

### Step 2: Configure Environment Variables

In your marketplace, configure the following environment variables:
```
ZKP_DAPP_URL=https://your-dapp.netlify.app
ZKP_DAPP_API_KEY=your_api_key_if_required
```

### Step 3: Choose Integration Method

Select the integration method that best fits your needs based on the options above.

### Step 4: Implement the Integration

Follow the code examples for your chosen integration method.

### Step 5: Test the Integration

1. Generate a compliance proof
2. Generate a rental trust proof
3. Verify proof hashes
4. Test the full flow in your marketplace

---

## XRPL Transaction Integration

To include proof hashes in XRPL transactions:

```typescript
import { createNFTOfferWithZKProof } from './services/xrpl-service';

const result = await createNFTOfferWithZKProof(
    client,
    wallet,
    nftId,
    proofHash,
    'compliance',
    '1000000' // amount in drops
);

// Proof hash is stored in the transaction memo
```

The proof hash will be embedded in the XRPL transaction memo field for verification on-chain.

---

## Verification Flow

To verify proofs in your marketplace:

```typescript
async function verifyProofInMarketplace(proofHash, proofType) {
    const response = await fetch(`${ZKP_DAPP_URL}/api/zk/verify-proof`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ proofHash, proofType })
    });

    const { valid, userAddress, expiresAt } = await response.json();
    
    if (valid && new Date(expiresAt) > new Date()) {
        // Proof is valid and not expired
        return true;
    }
    
    return false;
}
```

---

## Common Use Cases

### Use Case 1: RWA Purchase with Compliance

```typescript
async function purchaseRWA(nftId, walletAddress) {
    // 1. Generate compliance proof
    const proofHash = await generateComplianceProof(walletAddress);
    
    // 2. Verify proof
    const isValid = await verifyProofInMarketplace(proofHash, 'compliance');
    
    if (!isValid) {
        throw new Error('Invalid compliance proof');
    }
    
    // 3. Create NFT offer with proof
    const result = await createNFTOfferWithZKProof(
        client,
        wallet,
        nftId,
        proofHash,
        'compliance'
    );
    
    return result;
}
```

### Use Case 2: NFT Rental Request with Trust Score

```typescript
async function requestNFTRental(nftId, walletAddress) {
    // 1. Generate rental trust proof
    const proofHash = await generateRentalTrustProof(walletAddress);
    
    // 2. Verify proof
    const isValid = await verifyProofInMarketplace(proofHash, 'rental_trust');
    
    if (!isValid) {
        throw new Error('Invalid trust score proof');
    }
    
    // 3. Create rental request with proof
    const result = await submitRentalRequest(nftId, proofHash);
    
    return result;
}
```

---

## Troubleshooting

### CORS Errors

If you encounter CORS errors:
1. Ensure your dApp URL is in the allowed origins
2. Check Netlify function headers include `Access-Control-Allow-Origin: *`
3. Consider using API integration instead of iframe for same-origin

### Proof Verification Fails

If proof verification fails:
1. Check proof hasn't expired (compliance: 1 year, rental trust: 6 months)
2. Verify proof hash matches database record
3. Check proof hasn't been revoked

### API Rate Limits

If you hit rate limits:
1. Implement caching on your marketplace side
2. Consider using the widget component for client-side generation
3. Contact dApp administrator about rate limit increases

---

## Support

For integration issues or questions:
- Check the main README.md for API documentation
- Review the source code in `src/components/` for component examples
- Check the Netlify function logs for debugging
