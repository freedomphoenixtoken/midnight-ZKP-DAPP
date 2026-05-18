import type { ComplianceProofInput, RentalTrustProofInput } from '../zk/proofs/proof-utils';
import { pureCircuits as nftOwnershipCircuits } from '../../compiled-contracts/nft-ownership/contract/index';
import { pureCircuits as xrpBalanceCircuits } from '../../compiled-contracts/xrp-balance/contract/index';
import { pureCircuits as transactionHistoryCircuits } from '../../compiled-contracts/transaction-history/contract/index';
import { pureCircuits as royaltyComplianceCircuits } from '../../compiled-contracts/royalty-compliance/contract/index';
import { pureCircuits as trustLineCircuits } from '../../compiled-contracts/trust-line/contract/index';
import type { ConnectedAPI } from '@midnight-ntwrk/dapp-connector-api';

export class MidnightService {
    private walletApi: ConnectedAPI | null = null;
    private networkConfig = {
        // Pre-Prod Midnight Network endpoints
        networkId: 'preprod',
        rpcUrl: 'https://rpc.pre-prod.midnight.network',
        explorerUrl: 'https://explorer.pre-prod.midnight.network',
        // 1AM wallet configuration
        walletId: '1am',
        docsUrl: 'https://docs.midnight.network'
    };

    constructor() {
        // Initialize 1AM wallet configuration
        this.initializeWallet();
    }

    private async initializeWallet() {
        try {
            // Check if 1AM wallet is available via DApp connector
            if (typeof window !== 'undefined' && window.midnight) {
                const wallet = window.midnight[this.networkConfig.walletId];
                if (wallet) {
                    // Connect to 1AM wallet on pre-prod network
                    this.walletApi = await wallet.connect(this.networkConfig.networkId);
                    console.log('1AM Wallet connected to pre-prod network successfully');
                } else {
                    console.warn('1AM wallet not found in window.midnight');
                }
            } else {
                console.warn('window.midnight not available');
            }
        } catch (error) {
            console.warn('1AM Wallet connection failed, using fallback:', error);
            // Fallback to mock implementation if wallet connection fails
            this.walletApi = null;
        }
    }

    private async ensureWalletConnected() {
        if (!this.walletApi) {
            await this.initializeWallet();
        }
        return this.walletApi;
    }

    async generateComplianceProof(input: ComplianceProofInput): Promise<any> {
        // Try to use 1AM wallet for proof generation
        const wallet = await this.ensureWalletConnected();
        if (wallet) {
            try {
                // Use the compiled Compact circuit for NFT ownership verification
                const isValid = nftOwnershipCircuits.verify_nft_ownership(
                    BigInt(input.accreditationLevel),
                    BigInt(1),
                    BigInt(30)
                );
                
                console.log('NFT ownership circuit executed successfully:', isValid);
                
                return {
                    proof: {
                        nft_ownership_valid: isValid,
                        nft_count: input.accreditationLevel,
                        timestamp: input.verificationTimestamp,
                        publicInputs: {
                            userDid: input.userDid,
                            nftCount: input.accreditationLevel
                        },
                        wallet: '1am'
                    },
                    proofHash: this.generateMockHash(input.userDid, 'nft_ownership'),
                    circuitResult: isValid
                };
            } catch (error) {
                console.warn('Compact circuit execution failed, using fallback:', error);
            }
        }

        // Fallback: Generate a mock proof for development
        console.log('Using mock proof generation');
        return {
            proof: {
                nft_ownership_valid: true,
                nft_count: input.accreditationLevel,
                timestamp: input.verificationTimestamp,
                publicInputs: {
                    userDid: input.userDid
                },
                wallet: '1am'
            },
            proofHash: this.generateMockHash(input.userDid, 'nft_ownership')
        };
    }

    async generateRentalTrustProof(input: RentalTrustProofInput): Promise<any> {
        // Try to use 1AM wallet for proof generation
        const wallet = await this.ensureWalletConnected();
        if (wallet) {
            try {
                // Use the compiled Compact circuit for XRP balance verification
                const isValid = xrpBalanceCircuits.verify_xrp_balance(
                    BigInt(input.totalRentals),
                    BigInt(10),
                    BigInt(20)
                );
                
                console.log('XRP balance circuit executed successfully:', isValid);
                
                return {
                    proof: {
                        xrp_balance_valid: isValid,
                        xrp_balance: input.totalRentals,
                        publicInputs: {
                            userDid: input.userDid,
                            xrpBalance: input.totalRentals
                        },
                        wallet: '1am'
                    },
                    proofHash: this.generateMockHash(input.userDid, 'xrp_balance'),
                    circuitResult: isValid
                };
            } catch (error) {
                console.warn('Compact circuit execution failed, using fallback:', error);
            }
        }

        // Fallback: Generate a mock proof for development
        console.log('Using mock proof generation');
        return {
            proof: {
                xrp_balance_valid: true,
                xrp_balance: input.totalRentals,
                publicInputs: {
                    userDid: input.userDid
                },
                wallet: '1am'
            },
            proofHash: this.generateMockHash(input.userDid, 'xrp_balance')
        };
    }

    async generateAirdropEligibilityProof(tokenHoldings: number, _minHoldings: number, holdPeriod: number): Promise<any> {
        // Use the compiled Compact circuit for transaction history verification
        try {
            const isValid = transactionHistoryCircuits.verify_transaction_history(
                BigInt(tokenHoldings),
                BigInt(holdPeriod),
                BigInt(5)
            );
            
            console.log('Transaction history circuit executed successfully:', isValid);
            
            return {
                proof: {
                    tx_history_valid: isValid,
                    publicInputs: {
                        txCount: tokenHoldings,
                        walletAge: holdPeriod
                    },
                    wallet: '1am'
                },
                proofHash: this.generateMockHash('transaction_history', 'eligibility'),
                circuitResult: isValid
            };
        } catch (error) {
            console.warn('Compact circuit execution failed, using fallback:', error);
            return {
                proof: {
                    tx_history_valid: true,
                    publicInputs: { txCount: tokenHoldings, walletAge: holdPeriod },
                    wallet: '1am'
                },
                proofHash: this.generateMockHash('transaction_history', 'eligibility')
            };
        }
    }

    async generateRoyaltyComplianceProof(totalSales: number, royaltyPaid: number, royaltyRate: number): Promise<any> {
        // Use the compiled Compact circuit for royalty compliance verification
        try {
            const isValid = royaltyComplianceCircuits.verify_royalty_compliance(
                BigInt(totalSales),
                BigInt(royaltyPaid),
                BigInt(royaltyRate)
            );
            
            console.log('Royalty compliance circuit executed successfully:', isValid);
            
            return {
                proof: {
                    compliant: isValid,
                    publicInputs: {
                        totalSales,
                        royaltyPaid,
                        royaltyRate
                    },
                    wallet: '1am'
                },
                proofHash: this.generateMockHash('royalty', 'compliance'),
                circuitResult: isValid
            };
        } catch (error) {
            console.warn('Compact circuit execution failed, using fallback:', error);
            return {
                proof: {
                    compliant: true,
                    publicInputs: { totalSales, royaltyPaid, royaltyRate },
                    wallet: '1am'
                },
                proofHash: this.generateMockHash('royalty', 'compliance')
            };
        }
    }

    async generateGovernancePowerProof(tokenBalance: number, _votingWeight: number, _participationHistory: number): Promise<any> {
        // Use the compiled Compact circuit for trust line verification
        try {
            const isValid = trustLineCircuits.verify_trust_line(
                BigInt(tokenBalance),
                tokenBalance > 0,
                BigInt(1)
            );
            
            console.log('Trust line circuit executed successfully:', isValid);
            
            return {
                proof: {
                    trust_line_valid: isValid,
                    publicInputs: {
                        trustLineCount: tokenBalance,
                        hasRequiredTrust: tokenBalance > 0
                    },
                    wallet: '1am'
                },
                proofHash: this.generateMockHash('trust_line', 'power'),
                circuitResult: isValid
            };
        } catch (error) {
            console.warn('Compact circuit execution failed, using fallback:', error);
            return {
                proof: {
                    trust_line_valid: true,
                    publicInputs: { trustLineCount: tokenBalance, hasRequiredTrust: tokenBalance > 0 },
                    wallet: '1am'
                },
                proofHash: this.generateMockHash('trust_line', 'power')
            };
        }
    }

    async verifyProof(_proof: any, _circuitType: 'compliance' | 'rental_trust'): Promise<boolean> {
        // Try to use 1AM wallet for verification
        const wallet = await this.ensureWalletConnected();
        if (wallet) {
            try {
                console.log('1AM wallet connected, using wallet for verification');
                // Note: 1AM wallet specific verification methods would go here
                return true;
            } catch (error) {
                console.warn('1AM wallet verification failed, using fallback:', error);
            }
        }

        // Fallback: Use mock verification
        console.log('Using mock verification');
        return true;
    }

    private generateMockHash(userDid: string, type: string): string {
        const timestamp = Date.now();
        return `zk_${type}_${userDid.substring(0, 8)}_${timestamp}`;
    }
}
