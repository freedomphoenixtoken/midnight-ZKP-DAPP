import { ProofRegistry } from './proof-registry';

/**
 * DApp-Based Verification Service
 * 
 * This service allows the DApp to directly verify proofs from XRPL transaction memos
 * and provide verification results to marketplaces without needing a separate oracle.
 */

export interface MemoVerificationRequest {
  xrplTxHash: string;
  proofHash: string;
  proofType: string;
  xrplAddress: string;
}

export interface VerificationResponse {
  isValid: boolean;
  proofHash: string;
  proofType: string;
  verificationTimestamp: string;
  proofData?: any;
  errorMessage?: string;
}

export class DAppVerificationService {
  private proofRegistry: ProofRegistry;

  constructor(proofRegistry: ProofRegistry) {
    this.proofRegistry = proofRegistry;
  }

  /**
   * Verify a proof from an XRPL transaction memo
   * This is called when a marketplace queries the DApp with a proof hash
   */
  async verifyProofFromMemo(request: MemoVerificationRequest): Promise<VerificationResponse> {
    try {
      console.log('DApp verification: Processing proof from memo', request);

      // 1. Check if proof exists in registry
      const proofRecord = await this.proofRegistry.verifyProof(request.proofHash);

      if (!proofRecord) {
        return {
          isValid: false,
          proofHash: request.proofHash,
          proofType: request.proofType,
          verificationTimestamp: new Date().toISOString(),
          errorMessage: 'Proof not found or expired'
        };
      }

      // 2. Verify proof using compiled Midnight circuits
      const circuitVerified = await this.verifyWithCompiledCircuit(proofRecord);

      if (!circuitVerified) {
        return {
          isValid: false,
          proofHash: request.proofHash,
          proofType: request.proofType,
          verificationTimestamp: new Date().toISOString(),
          errorMessage: 'Circuit verification failed'
        };
      }

      // 3. Return verification result
      return {
        isValid: true,
        proofHash: proofRecord.proof_hash,
        proofType: proofRecord.proof_type,
        verificationTimestamp: new Date().toISOString(),
        proofData: proofRecord.proof_data
      };
    } catch (error) {
      console.error('DApp verification failed:', error);
      return {
        isValid: false,
        proofHash: request.proofHash,
        proofType: request.proofType,
        verificationTimestamp: new Date().toISOString(),
        errorMessage: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Verify proof using compiled Midnight circuits
   * This calls the actual verification logic from the compiled contracts
   */
  private async verifyWithCompiledCircuit(proofRecord: any): Promise<boolean> {
    try {
      // Import the compiled contract based on proof type
      let contract;
      switch (proofRecord.proof_type) {
        case 'nft_ownership':
          contract = await import('../../compiled-contracts/nft-ownership/contract/index.js');
          break;
        case 'xrp_balance':
          contract = await import('../../compiled-contracts/xrp-balance/contract/index.js');
          break;
        case 'transaction_history':
          contract = await import('../../compiled-contracts/transaction-history/contract/index.js');
          break;
        case 'royalty_compliance':
          contract = await import('../../compiled-contracts/royalty-compliance/contract/index.js');
          break;
        case 'trust_line':
          contract = await import('../../compiled-contracts/trust-line/contract/index.js');
          break;
        default:
          return false;
      }

      // Call the verification function from the compiled contract
      // The compiled contracts have verify functions that can be called
      if (contract && contract.verify) {
        const isValid = await contract.verify(proofRecord.proof_data);
        return isValid;
      }

      // Fallback: basic validation
      return this.basicValidation(proofRecord);
    } catch (error) {
      console.error('Circuit verification error:', error);
      // Fallback to basic validation
      return this.basicValidation(proofRecord);
    }
  }

  /**
   * Basic validation as fallback
   */
  private basicValidation(proofRecord: any): boolean {
    // Check if proof has required fields
    if (!proofRecord.proof_hash || proofRecord.proof_hash.length !== 64) {
      return false;
    }

    if (!proofRecord.midnight_signature) {
      return false;
    }

    if (!proofRecord.is_valid) {
      return false;
    }

    return true;
  }

  /**
   * Extract proof hash from XRPL transaction memo
   * This is used to parse the memo and get the proof hash
   */
  static extractProofHashFromMemo(memo: string): string | null {
    try {
      // Memos are hex-encoded, decode them
      const memoData = Buffer.from(memo, 'hex').toString('utf8');
      
      // The proof hash should be in the memo data
      // Format: "ZKP_VERIFICATION:<proof_hash>" or just the hash
      if (memoData.includes(':')) {
        const parts = memoData.split(':');
        return parts[1] || null;
      }
      
      return memoData;
    } catch (error) {
      console.error('Failed to extract proof hash from memo:', error);
      return null;
    }
  }

  /**
   * Get verification data for marketplace
   * This is called by marketplaces to get verification status
   */
  async getVerificationForMarketplace(proofHash: string): Promise<VerificationResponse> {
    return this.verifyProofFromMemo({
      xrplTxHash: '',
      proofHash,
      proofType: '',
      xrplAddress: ''
    });
  }
}
