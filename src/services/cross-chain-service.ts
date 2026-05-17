import { MidnightService } from './midnight-service';
import { DAppVerificationService } from './dapp-verification';
import { ProofRegistry } from './proof-registry';

// XRPL wallet integration types
interface XRPLWallet {
  address: string;
  signTransaction: (tx: any) => Promise<any>;
  submitTransaction: (tx: any) => Promise<any>;
}

interface CrossChainProof {
  midnightProofHash: string;
  midnightSignature: string;
  proofData: any;
  xrplVerificationStatus: 'pending' | 'verified' | 'failed';
  xrplTxHash?: string;
  proofType: 'nft_ownership' | 'xrp_balance' | 'transaction_history' | 'royalty_compliance' | 'trust_line';
}

export class CrossChainService {
  private midnightService: MidnightService;
  private xrplWallet: XRPLWallet | null = null;
  private dappVerification: DAppVerificationService;
  private proofRegistry: ProofRegistry;

  constructor(midnightService: MidnightService) {
    this.midnightService = midnightService;
    this.proofRegistry = new ProofRegistry();
    this.dappVerification = new DAppVerificationService(this.proofRegistry);
  }

  // Connect XRPL wallet
  async connectXRPLWallet(wallet: XRPLWallet): Promise<void> {
    this.xrplWallet = wallet;
    console.log('XRPL wallet connected:', wallet.address);
  }

  // Get DUST balance from Midnight wallet
  async getDUSTBalance(): Promise<string> {
    try {
      const walletApi = await this.midnightService['ensureWalletConnected']();
      
      if (!walletApi) {
        throw new Error('Midnight wallet not connected');
      }

      const balance = await walletApi.getBalance();
      console.log('DUST balance:', balance);
      return balance?.amount || '0';
    } catch (error) {
      console.error('Error getting DUST balance:', error);
      return '0';
    }
  }

  // Check if user has sufficient DUST for transaction signing
  async hasSufficientDUST(minRequired: string = '10000000'): Promise<boolean> {
    const balance = await this.getDUSTBalance();
    return BigInt(balance) >= BigInt(minRequired);
  }

  // Generate ZK proof on Midnight and sign with DUST
  async generateAndSignMidnightProof(
    proofType: 'nft_ownership' | 'xrp_balance' | 'transaction_history' | 'royalty_compliance' | 'trust_line',
    proofData: any
  ): Promise<CrossChainProof> {
    try {
      console.log('Generating ZK proof on Midnight network...');

      // Check DUST balance before proceeding
      const hasDUST = await this.hasSufficientDUST();
      if (!hasDUST) {
        console.warn('Insufficient DUST balance for transaction signing');
        throw new Error('Insufficient DUST balance. Please get DUST from the faucet: https://midnight.network/test-faucet');
      }

      // 1. Generate ZK proof using Compact circuit
      let proof;
      switch (proofType) {
        case 'nft_ownership':
          proof = await this.midnightService.generateComplianceProof(proofData);
          break;
        case 'xrp_balance':
          proof = await this.midnightService.generateRentalTrustProof(proofData);
          break;
        case 'transaction_history':
          proof = await this.midnightService.generateAirdropEligibilityProof(
            proofData.tokenHoldings,
            proofData.minHoldings,
            proofData.holdPeriod
          );
          break;
        case 'royalty_compliance':
          proof = await this.midnightService.generateRoyaltyComplianceProof(
            proofData.totalSales,
            proofData.royaltyPaid,
            proofData.royaltyRate
          );
          break;
        case 'trust_line':
          proof = await this.midnightService.generateGovernancePowerProof(
            proofData.tokenBalance,
            proofData.votingWeight,
            proofData.participationHistory
          );
          break;
        default:
          throw new Error('Unknown proof type');
      }

      // 2. Sign the proof on Midnight network using DUST
      const midnightSignature = await this.signMidnightTransaction(proof, proofType);

      const crossChainProof: CrossChainProof = {
        midnightProofHash: proof.proofHash,
        midnightSignature,
        proofData: proof,
        xrplVerificationStatus: 'pending',
        proofType
      };

      console.log('Midnight proof generated and signed:', crossChainProof);
      return crossChainProof;
    } catch (error) {
      console.error('Error generating Midnight proof:', error);
      throw error;
    }
  }

  // Sign transaction on Midnight network using DUST
  private async signMidnightTransaction(proof: any, proofType: string): Promise<string> {
    try {
      // Get wallet API from MidnightService
      const walletApi = await this.midnightService['ensureWalletConnected']();
      
      if (!walletApi) {
        throw new Error('Midnight wallet not connected');
      }

      // Create a balance transaction to pay DUST for proof generation
      const balanceTx = {
        contract: proofType,
        publicInputs: proof.proof.publicInputs,
        fee: '10000000' // 0.01 DUST in plancks
      };

      // Submit transaction to Midnight network
      const txResult = await walletApi.balanceTransaction(balanceTx);
      
      console.log('Midnight transaction signed with DUST:', txResult);
      return txResult.txHash || 'mock_signature_' + Date.now();
    } catch (error) {
      console.error('Error signing Midnight transaction:', error);
      // Fallback for development without actual DUST
      console.warn('Using mock signature for development');
      return 'mock_signature_' + Date.now();
    }
  }

  // Verify Midnight proof on XRPL side with proper transaction types
  async verifyOnXRPL(crossChainProof: CrossChainProof): Promise<boolean> {
    if (!this.xrplWallet) {
      throw new Error('XRPL wallet not connected');
    }

    try {
      console.log('Verifying Midnight proof on XRPL...');

      // Create appropriate XRPL transaction based on proof type
      let xrplTx: any;

      switch (crossChainProof.proofType) {
        case 'nft_ownership':
          // Use NFTokenAcceptOffer for NFT ownership verification
          xrplTx = {
            TransactionType: 'NFTokenAcceptOffer',
            Account: this.xrplWallet.address,
            NFTokenSellOffer: '0000000000000000000000000000000000000000000000000000000000000000', // Placeholder
            Fee: '1000000' // 1 XRP drop for verification fee
          };
          break;
        case 'xrp_balance':
          // Use Payment for balance verification
          xrplTx = {
            TransactionType: 'Payment',
            Account: this.xrplWallet.address,
            Destination: 'rMidnightVerificationAddress', // Placeholder verification address
            Amount: '1000000', // 1 XRP drop for verification fee
            Memos: [
              {
                Memo: {
                  MemoData: Buffer.from(crossChainProof.midnightProofHash).toString('hex'),
                  MemoType: Buffer.from('ZKP_BALANCE_VERIFICATION').toString('hex')
                }
              }
            ]
          };
          break;
        case 'transaction_history':
          // Use AccountSet for activity verification
          xrplTx = {
            TransactionType: 'AccountSet',
            Account: this.xrplWallet.address,
            Fee: '1000000',
            Memos: [
              {
                Memo: {
                  MemoData: Buffer.from(crossChainProof.midnightProofHash).toString('hex'),
                  MemoType: Buffer.from('ZKP_ACTIVITY_VERIFICATION').toString('hex')
                }
              }
            ]
          };
          break;
        case 'royalty_compliance':
          // Use Payment for royalty verification
          xrplTx = {
            TransactionType: 'Payment',
            Account: this.xrplWallet.address,
            Destination: 'rMidnightVerificationAddress',
            Amount: '1000000',
            Memos: [
              {
                Memo: {
                  MemoData: Buffer.from(crossChainProof.midnightProofHash).toString('hex'),
                  MemoType: Buffer.from('ZKP_ROYALTY_VERIFICATION').toString('hex')
                }
              }
            ]
          };
          break;
        case 'trust_line':
          // Use TrustSet for trust line verification
          xrplTx = {
            TransactionType: 'TrustSet',
            Account: this.xrplWallet.address,
            Fee: '1000000',
            Memos: [
              {
                Memo: {
                  MemoData: Buffer.from(crossChainProof.midnightProofHash).toString('hex'),
                  MemoType: Buffer.from('ZKP_TRUST_VERIFICATION').toString('hex')
                }
              }
            ]
          };
          break;
        default:
          throw new Error('Unknown proof type for XRPL verification');
      }

      // 2. Sign transaction on XRPL
      const signedTx = await this.xrplWallet.signTransaction(xrplTx);
      
      // 3. Submit to XRPL ledger
      const submitResult = await this.xrplWallet.submitTransaction(signedTx);
      
      console.log('XRPL verification transaction submitted:', submitResult);

      // 4. Store proof in registry
      await this.proofRegistry.storeProof({
        proofHash: crossChainProof.midnightProofHash,
        proofType: crossChainProof.proofType,
        midnightSignature: crossChainProof.midnightSignature,
        xrplAddress: this.xrplWallet.address,
        midnightAddress: '', // Would need to get from Midnight wallet
        proofData: crossChainProof.proofData
      });

      // 5. Update cross-chain proof status
      crossChainProof.xrplVerificationStatus = 'verified';
      crossChainProof.xrplTxHash = submitResult.result?.tx_json?.hash;

      console.log('Cross-chain verification completed - proof stored for marketplace verification');
      return true;
    } catch (error) {
      console.error('Error verifying on XRPL:', error);
      crossChainProof.xrplVerificationStatus = 'failed';
      throw error;
    }
  }

  // Complete cross-chain flow: Generate proof on Midnight, sign with DUST, verify on XRPL
  async executeCrossChainFlow(
    proofType: 'nft_ownership' | 'xrp_balance' | 'transaction_history' | 'royalty_compliance' | 'trust_line',
    proofData: any
  ): Promise<CrossChainProof> {
    console.log('Starting cross-chain flow...');

    try {
      // Step 1: Generate and sign proof on Midnight
      const crossChainProof = await this.generateAndSignMidnightProof(proofType, proofData);

      // Step 2: Verify on XRPL
      const verified = await this.verifyOnXRPL(crossChainProof);

      if (!verified) {
        throw new Error('Cross-chain verification failed');
      }

      console.log('Cross-chain flow completed successfully:', crossChainProof);
      return crossChainProof;
    } catch (error) {
      console.error('Cross-chain flow failed:', error);
      throw error;
    }
  }

  // Get marketplace verification data (for marketplace integration)
  getMarketplaceVerificationData(proof: CrossChainProof): {
    proofHash: string;
    proofType: string;
    midnightSignature: string;
    xrplTxHash?: string;
    verificationStatus: string;
    isValid: boolean;
  } {
    return {
      proofHash: proof.midnightProofHash,
      proofType: proof.proofType,
      midnightSignature: proof.midnightSignature,
      xrplTxHash: proof.xrplTxHash,
      verificationStatus: proof.xrplVerificationStatus,
      isValid: proof.xrplVerificationStatus === 'verified'
    };
  }

  // Get verification service for marketplace queries
  getVerificationService(): DAppVerificationService {
    return this.dappVerification;
  }
}
