# Detailed Setup Guide - Midnight Compact Integration

## Step 1: Install Ubuntu in WSL

### Troubleshooting WSL Installation Timeout

If you encountered the timeout error, try these solutions:

**Option A: Use Microsoft Store (Recommended)**
1. Open Microsoft Store
2. Search for "Ubuntu"
3. Click "Get" or "Install" on Ubuntu 22.04 LTS (latest version)
4. Wait for installation to complete
5. Click "Open" to launch Ubuntu
6. Set up your username and password when prompted

**Option B: Use PowerShell with Retry**
1. Open PowerShell as Administrator
2. Run: `wsl --update`
3. Wait for update to complete
4. Run: `wsl --install -d Ubuntu`
5. Restart computer when prompted

**Option C: Manual Download**
1. Visit: https://aka.ms/wslubuntu2204
2. Download the Ubuntu 22.04 LTS appx package
3. Double-click to install
4. Launch from Start menu

### After Ubuntu Installation
1. Open Ubuntu from Start menu
2. You'll see a terminal prompt asking for username and password
3. Enter a username (no spaces, all lowercase)
4. Enter a password (you won't see characters as you type, this is normal)
5. Re-enter password to confirm
6. Run: `sudo apt update && sudo apt upgrade -y`

---

## Step 2: Install Compact Compiler in Ubuntu

### Open Ubuntu Terminal
1. Launch Ubuntu from Start menu
2. You should see a terminal with your username

### Install Prerequisites
```bash
# Update package lists
sudo apt update

# Upgrade installed packages
sudo apt upgrade -y

# Install curl (required for Compact installer)
sudo apt install -y curl

# Install git (if not already installed)
sudo apt install -y git

# Install build-essential (for compilation)
sudo apt install -y build-essential
```

### Install Compact Compiler
```bash
# Download and run Compact installer
curl --proto '=https' --tlsv1.2 -LsSf https://github.com/midnightntwrk/compact/releases/latest/download/compact-installer.sh | sh

# Reload shell configuration to add Compact to PATH
source ~/.bashrc

# Verify Compact installation
compact --version

# You should see output like: Compact 0.x.x

# Update to latest version
compact update

# Verify compiler version
compact compile --version
```

### Troubleshooting Compact Installation
- If `compact: command not found`, manually add to PATH:
  ```bash
  echo 'export PATH="$HOME/.compact/bin:$PATH"' >> ~/.bashrc
  source ~/.bashrc
  ```
- If curl fails, try: `sudo apt install -y wget` then use wget instead

---

## Step 3: Install Docker Desktop

### Download Docker Desktop
1. Visit: https://www.docker.com/products/docker-desktop/
2. Click "Download for Windows"
3. Save the installer (Docker Desktop Installer.exe)

### Install Docker Desktop
1. Double-click the downloaded installer
2. During installation, ensure these options are checked:
   - ✅ Use WSL 2 based engine
   - ✅ Add shortcut to desktop
3. Click "Ok" to complete installation
4. Restart computer when prompted

### Configure Docker Desktop
1. Launch Docker Desktop from Start menu
2. Accept the Docker Subscription Service Agreement
3. Go to Settings → Resources → WSL Integration
4. Enable "Enable integration with my default WSL distro"
5. Enable "Ubuntu" in the list of distributions
6. Click "Apply & Restart"

### Verify Docker Installation
```bash
# In PowerShell (Windows)
docker --version

# In Ubuntu terminal
docker --version

# Test Docker with hello-world
docker run hello-world
```

### Troubleshooting Docker
- If Docker doesn't start, ensure WSL 2 is enabled:
  ```powershell
  # In PowerShell (Admin)
  wsl --set-default-version 2
  ```
- If "docker: command not found" in Ubuntu, ensure WSL integration is enabled in Docker Desktop settings

---

## Step 4: Compile Compact Contracts

### Navigate to Project Directory in WSL
```bash
# In Ubuntu terminal, navigate to your project
cd /mnt/c/Users/ashes/Downloads/midnight-zkp-dapp

# Verify you're in the right directory (should see contracts/ folder)
ls
```

### Compile All Contracts
```bash
# Compile all contracts at once
npm run compile:contracts

# Or compile individually:
compact compile contracts/compliance-passport.compact -o compiled-contracts/compliance-passport
compact compile contracts/rental-trust.compact -o compiled-contracts/rental-trust
compact compile contracts/airdrop-eligibility.compact -o compiled-contracts/airdrop-eligibility
compact compile contracts/royalty-compliance.compact -o compiled-contracts/royalty-compliance
compact compile contracts/governance-power.compact -o compiled-contracts/governance-power
```

### Verify Compilation
```bash
# Check compiled-contracts directory
ls compiled-contracts/

# You should see 5 directories with compiled JavaScript files
```

### Troubleshooting Compilation
- If "compact: command not found", repeat Step 2
- If compilation fails with syntax errors, check .compact files for typos
- If "npm: command not found", install Node.js in Ubuntu:
  ```bash
  curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
  sudo apt install -y nodejs
  ```

---

## Step 5: Install 1AM Wallet

### Install Browser Extension
1. Open Google Chrome (recommended browser)
2. Visit: https://1am.xyz/
3. Click "Install Extension" or "Get Started"
4. You'll be redirected to Chrome Web Store
5. Click "Add to Chrome"
6. Click "Add Extension" to confirm
7. The 1AM wallet icon will appear in your browser toolbar

### Create/Import Wallet
1. Click the 1AM wallet icon in browser toolbar
2. Click "Create New Wallet" or "Import Existing Wallet"
3. If creating new:
   - Write down your seed phrase (12 words) - KEEP THIS SAFE!
   - Set a strong password
   - Confirm seed phrase to complete setup

### Configure Network Settings
1. Open 1AM wallet extension
2. Click Settings (gear icon)
3. Go to "Network" section
4. Select "Pre-Prod" network (NOT Mainnet)
5. Click "Save" or "Apply"

### Verify Network
1. In 1AM wallet, check the network indicator
2. Should show "Pre-Prod" or similar
3. Your address should start with a different prefix than mainnet

---

## Step 6: Enable Proof Station

### Why Enable Proof Station?
- Bypasses the need to run a local Midnight proof server
- Allows in-browser ZK proof generation
- Simplifies development and testing
- Recommended by Stephanie @ 1AM wallet

### Enable Proof Station
1. Open 1AM wallet extension
2. Click Settings (gear icon)
3. Go to "Advanced" or "Developer" section
4. Find "Proof Station" toggle
5. Enable "Proof Station" (toggle should turn blue/green)
6. You may need to restart the wallet extension

### Verify Proof Station is Enabled
1. In 1AM wallet, look for "Proof Station" indicator
2. Should show as "Active" or "Enabled"
3. When generating proofs, it should use in-browser generation

---

## Step 7: Get Test Tokens from Pre-Prod Faucet

### Visit Pre-Prod Faucet
1. Open browser and visit: https://midnight.network/test-faucet
2. Ensure 1AM wallet is connected to Pre-Prod network
3. Click "Connect Wallet" button
4. Select 1AM wallet when prompted
5. Approve connection in 1AM wallet popup

### Request tDUST Tokens
1. After connecting, you should see your address
2. Click "Request tDUST" or "Get Tokens" button
3. Wait for transaction to complete (may take 10-30 seconds)
4. You should see a success message

### Verify Token Receipt
1. Open 1AM wallet extension
2. Check your balance
3. You should see NIGHT tokens
4. DUST tokens will auto-generate shortly after

### Troubleshooting Faucet
- If faucet doesn't work, ensure you're on Pre-Prod network
- If "Insufficient funds", wait a few minutes and try again
- If connection fails, refresh page and reconnect wallet

---

## Step 8: Update MidnightService for Pre-Prod Network

### Edit Network Configuration
Open `src/services/midnight-service.ts` and update:

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

### Save Changes
1. Save the file
2. The app will now use pre-prod endpoints

---

## Step 9: Test Proof Generation with 1AM Wallet

### Start Development Server
```bash
# In Windows terminal (PowerShell or CMD)
cd c:\Users\ashes\Downloads\idnight-zkp-dapp
npm run dev
```

### Open Application
1. Open browser to: http://localhost:5173
2. Navigate to Compliance page
3. Click "Generate Proof" button

### Connect 1AM Wallet
1. 1AM wallet extension should popup
2. Approve connection to Pre-Prod network
3. Approve proof generation request
4. Wait for proof to generate

### Verify Proof Generation
1. Check browser console for "1AM wallet connected" message
2. Verify proof hash is generated
3. Check that proof shows "wallet: 1am" in metadata

### Test Other Proof Types
1. Navigate to other pages (Rental Trust, Airdrop Eligibility, etc.)
2. Generate proofs for each type
3. Verify all work with 1AM wallet

---

## Step 10: Deploy Compact Contracts to Pre-Prod

### Deploy Contracts
```bash
# In Ubuntu terminal (project directory)
compact deploy compiled-contracts/compliance-passport --network pre-prod
compact deploy compiled-contracts/rental-trust --network pre-prod
compact deploy compiled-contracts/airdrop-eligibility --network pre-prod
compact deploy compiled-contracts/royalty-compliance --network pre-prod
compact deploy compiled-contracts/governance-power --network pre-prod
```

### Save Contract Addresses
After each deployment, you'll receive a contract address. Save these:

```typescript
// In src/services/midnight-service.ts
private contractAddresses = {
    compliancePassport: 'DEPLOYED_ADDRESS_1',
    rentalTrust: 'DEPLOYED_ADDRESS_2',
    airdropEligibility: 'DEPLOYED_ADDRESS_3',
    royaltyCompliance: 'DEPLOYED_ADDRESS_4',
    governancePower: 'DEPLOYED_ADDRESS_5'
};
```

### Verify Deployments
1. Visit: https://explorer.pre-prod.midnight.network/
2. Search for your contract addresses
3. Verify contracts are deployed

---

## Step 11: Final Testing and Deployment

### Test All Features
1. Generate all proof types
2. Verify proofs with 1AM wallet
3. Check browser console for errors
4. Test on different browsers

### Build Production Version
```bash
# In Windows terminal
npm run build
```

### Deploy to Netlify
```bash
# Push to GitHub (automatic Netlify deployment)
git add .
git commit -m "Complete Compact integration with 1AM wallet"
git push
```

### Verify Production
1. Visit: https://mignight-zkp-dapp.netlify.app/
2. Test proof generation in production
3. Verify 1AM wallet connection works

---

## Summary Checklist

- [ ] Ubuntu installed in WSL
- [ ] Compact compiler installed and verified
- [ ] Docker Desktop installed with WSL 2 integration
- [ ] All Compact contracts compiled successfully
- [ ] 1AM wallet extension installed
- [ ] 1AM wallet configured for Pre-Prod network
- [ ] Proof Station enabled in 1AM wallet
- [ ] NIGHT tokens received from pre-prod faucet
- [ ] MidnightService updated for pre-prod network
- [ ] Proof generation tested with 1AM wallet
- [ ] Compact contracts deployed to pre-prod
- [ ] Contract addresses saved in MidnightService
- [ ] Production build successful
- [ ] Deployed to Netlify
- [ ] Production deployment verified

---

## Common Issues and Solutions

### Issue: WSL installation timeout
**Solution:** Use Microsoft Store to install Ubuntu instead of PowerShell command

### Issue: Compact compiler not found after installation
**Solution:** Run `source ~/.bashrc` or manually add to PATH

### Issue: Docker Desktop won't start
**Solution:** Ensure WSL 2 is enabled with `wsl --set-default-version 2`

### Issue: Contracts fail to compile
**Solution:** Check syntax in .compact files, ensure Compact compiler is up to date

### Issue: 1AM wallet won't connect
**Solution:** Ensure you're on Pre-Prod network, refresh page, try different browser

### Issue: Faucet doesn't work
**Solution:** Wait a few minutes between requests, ensure Pre-Prod network is selected

### Issue: Proof generation fails
**Solution:** Enable Proof Station in 1AM wallet settings, check browser console for errors

---

## Next Steps After Completion

1. **Get Feedback from Stephanie** - Share the repo URL with Stephanie for review
2. **Test on Mainnet** - After pre-prod testing, configure for mainnet
3. **Deploy Contracts to Mainnet** - Deploy Compact contracts to production network
4. **Update Documentation** - Add mainnet deployment instructions
5. **Security Audit** - Consider professional security review before mainnet launch

---

## Support Resources

- **Midnight Docs:** https://docs.midnight.network/
- **Compact GitHub:** https://github.com/midnightntwrk/compact
- **1AM Wallet:** https://1am.xyz/
- **Pre-Prod Faucet:** https://faucet.midnight.network/
- **Pre-Prod Explorer:** https://explorer.pre-prod.midnight.network/
- **Discord Support:** Check Midnight Network Discord for help
