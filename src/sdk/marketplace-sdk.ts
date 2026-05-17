/**
 * Midnight ZKP Marketplace SDK
 * 
 * This SDK allows XRPL marketplaces to verify Midnight ZK proofs
 * by querying the DApp's verification API directly.
 * 
 * The DApp reads proof hashes from XRPL transaction memos and verifies them
 * using the compiled Midnight circuits, providing verification results to marketplaces.
 * 
 * Usage:
 * ```typescript
 * import { MarketplaceSDK } from '@midnight-zkp/marketplace-sdk';
 * 
 * const sdk = new MarketplaceSDK('https://your-dapp-url.com');
 * const isValid = await sdk.verifyProof(proofHash);
 * ```
 */

export interface ProofVerificationRequest {
  proofHash: string;
  proofType: 'nft_ownership' | 'xrp_balance' | 'transaction_history' | 'royalty_compliance' | 'trust_line';
  xrplAddress: string;
  timestamp: number;
}

export interface ProofVerificationResponse {
  isValid: boolean;
  proofType: string;
  midnightSignature: string;
  xrplTxHash?: string;
  verificationTime: string;
  expiresAt: string;
  proofData?: any;
}

export class MarketplaceSDK {
  private apiBaseUrl: string;

  constructor(apiBaseUrl: string = 'https://api.midnight-zkp.com/v1') {
    this.apiBaseUrl = apiBaseUrl;
  }

  /**
   * Verify a Midnight ZK proof by hash
   * This is the main method marketplaces should use to verify proofs
   */
  async verifyProof(proofHash: string): Promise<ProofVerificationResponse> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/verify/${proofHash}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Verification failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Proof verification error:', error);
      throw error;
    }
  }

  /**
   * Batch verify multiple proofs
   * Useful for marketplaces that need to verify multiple user proofs
   */
  async verifyProofsBatch(proofHashes: string[]): Promise<Record<string, ProofVerificationResponse>> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/verify/batch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ proofHashes }),
      });

      if (!response.ok) {
        throw new Error(`Batch verification failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Batch verification error:', error);
      throw error;
    }
  }

  /**
   * Get all valid proofs for an XRPL address
   * Useful for marketplaces to check a user's proof history
   */
  async getProofsForAddress(xrplAddress: string): Promise<ProofVerificationResponse[]> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/address/${xrplAddress}/proofs`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to get proofs: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get proofs error:', error);
      throw error;
    }
  }

  /**
   * Check if a user meets specific requirements based on their proofs
   * This is a convenience method for marketplaces to check eligibility
   */
  async checkEligibility(
    xrplAddress: string,
    requirements: {
      requiresNftOwnership?: boolean;
      minXrpBalance?: number;
      minTransactionHistory?: number;
      royaltyCompliance?: boolean;
      hasTrustLines?: string[];
    }
  ): Promise<{
    eligible: boolean;
    metRequirements: string[];
    missingRequirements: string[];
  }> {
    try {
      const proofs = await this.getProofsForAddress(xrplAddress);
      const proofMap = new Map(proofs.map(p => [p.proofType, p]));

      const metRequirements: string[] = [];
      const missingRequirements: string[] = [];

      // Check NFT ownership
      if (requirements.requiresNftOwnership) {
        const nftProof = proofMap.get('nft_ownership');
        if (nftProof && nftProof.isValid) {
          metRequirements.push('NFT ownership verified');
        } else {
          missingRequirements.push('NFT ownership proof required');
        }
      }

      // Check XRP balance
      if (requirements.minXrpBalance !== undefined) {
        const balanceProof = proofMap.get('xrp_balance');
        if (balanceProof && balanceProof.isValid && balanceProof.proofData) {
          metRequirements.push(`XRP balance verified (≥${requirements.minXrpBalance} XRP)`);
        } else {
          missingRequirements.push(`Minimum XRP balance of ${requirements.minXrpBalance} required`);
        }
      }

      // Check transaction history
      if (requirements.minTransactionHistory !== undefined) {
        const historyProof = proofMap.get('transaction_history');
        if (historyProof && historyProof.isValid) {
          metRequirements.push(`Transaction history verified (≥${requirements.minTransactionHistory} transactions)`);
        } else {
          missingRequirements.push(`Minimum transaction history of ${requirements.minTransactionHistory} required`);
        }
      }

      // Check royalty compliance
      if (requirements.royaltyCompliance) {
        const royaltyProof = proofMap.get('royalty_compliance');
        if (royaltyProof && royaltyProof.isValid) {
          metRequirements.push('Royalty compliance verified');
        } else {
          missingRequirements.push('Royalty compliance proof required');
        }
      }

      // Check trust lines
      if (requirements.hasTrustLines && requirements.hasTrustLines.length > 0) {
        const trustProof = proofMap.get('trust_line');
        if (trustProof && trustProof.isValid) {
          metRequirements.push(`Trust lines verified (${requirements.hasTrustLines.join(', ')})`);
        } else {
          missingRequirements.push(`Trust lines for ${requirements.hasTrustLines.join(', ')} required`);
        }
      }

      return {
        eligible: missingRequirements.length === 0,
        metRequirements,
        missingRequirements,
      };
    } catch (error) {
      console.error('Eligibility check error:', error);
      throw error;
    }
  }

  /**
   * Validate a proof hash format
   * This is a utility method to check if a proof hash is valid before verification
   */
  static isValidProofHash(proofHash: string): boolean {
    // Proof hashes should be 64 character hex strings
    const hexRegex = /^[0-9a-fA-F]{64}$/;
    return hexRegex.test(proofHash);
  }

  /**
   * Validate an XRPL address format
   * This is a utility method to check if an XRPL address is valid
   */
  static isValidXRPLAddress(address: string): boolean {
    // XRPL addresses should be 25-35 characters starting with 'r'
    const xrplRegex = /^r[a-zA-Z0-9]{24,34}$/;
    return xrplRegex.test(address);
  }
}

// Export a default instance for convenience
export const marketplaceSDK = new MarketplaceSDK();
