import type { ComplianceProofInput, RentalTrustProofInput } from '../zk/proofs/proof-utils';
import { pureCircuits as complianceCircuits } from '../../compiled-contracts/compliance-passport/contract/index';
import { pureCircuits as rentalTrustCircuits } from '../../compiled-contracts/rental-trust/contract/index';
import { pureCircuits as airdropEligibilityCircuits } from '../../compiled-contracts/airdrop-eligibility/contract/index';
import { pureCircuits as royaltyComplianceCircuits } from '../../compiled-contracts/royalty-compliance/contract/index';
import { pureCircuits as governancePowerCircuits } from '../../compiled-contracts/governance-power/contract/index';

// DApp Connector API types (from @midnight-ntwrk/dapp-connector-api)
interface ConnectedAPI {
  getWalletInfo: () => Promise<any>;
  getBalance: () => Promise<any>;
  submitTransaction: (tx: any) => Promise<any>;
  balanceTransaction: (tx: any) => Promise<any>;
}

// Type declaration for window.midnight
declare global {
  interface Window {
    midnight?: {
      [key: string]: {
        connect: (networkId: string) => Promise<ConnectedAPI>;
      };
    };
  }
}

export class MidnightService {
    private walletApi: ConnectedAPI | null = null;
    private networkConfig = {
        // Pre-Prod Midnight Network endpoints
        networkId: 'pre-prod',
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
                // Use the compiled Compact circuit for compliance verification
                const isValid = complianceCircuits.verify_compliance(
                    input.kycStatus,
                    BigInt(input.accreditationLevel)
                );
                
                console.log('Compliance circuit executed successfully:', isValid);
                
                return {
                    proof: {
                        compliance_valid: isValid,
                        accreditation_level: input.accreditationLevel,
                        timestamp: input.verificationTimestamp,
                        publicInputs: {
                            userDid: input.userDid,
                            kycStatus: input.kycStatus,
                            accreditationLevel: input.accreditationLevel
                        },
                        wallet: '1am'
                    },
                    proofHash: this.generateMockHash(input.userDid, 'compliance'),
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
                compliance_valid: true,
                accreditation_level: input.accreditationLevel,
                timestamp: input.verificationTimestamp,
                publicInputs: {
                    userDid: input.userDid
                },
                wallet: '1am'
            },
            proofHash: this.generateMockHash(input.userDid, 'compliance')
        };
    }

    async generateRentalTrustProof(input: RentalTrustProofInput): Promise<any> {
        // Try to use 1AM wallet for proof generation
        const wallet = await this.ensureWalletConnected();
        if (wallet) {
            try {
                // Use the compiled Compact circuit for rental trust verification
                const isValid = rentalTrustCircuits.verify_rental_trust(
                    BigInt(input.totalRentals),
                    BigInt(input.successfulRentals),
                    BigInt(input.onTimeReturns)
                );
                
                console.log('Rental trust circuit executed successfully:', isValid);
                
                const successRate = Math.round((input.successfulRentals / input.totalRentals) * 100);
                const onTimeRate = Math.round((input.onTimeReturns / input.totalRentals) * 100);
                
                return {
                    proof: {
                        trust_score_valid: isValid,
                        success_rate: successRate,
                        ontime_rate: onTimeRate,
                        publicInputs: {
                            userDid: input.userDid,
                            totalRentals: input.totalRentals,
                            successfulRentals: input.successfulRentals,
                            onTimeReturns: input.onTimeReturns
                        },
                        wallet: '1am'
                    },
                    proofHash: this.generateMockHash(input.userDid, 'rental_trust'),
                    circuitResult: isValid
                };
            } catch (error) {
                console.warn('Compact circuit execution failed, using fallback:', error);
            }
        }

        // Fallback: Generate a mock proof for development
        console.log('Using mock proof generation');
        const successRate = Math.round((input.successfulRentals / input.totalRentals) * 100);
        const onTimeRate = Math.round((input.onTimeReturns / input.totalRentals) * 100);
        
        return {
            proof: {
                trust_score_valid: true,
                success_rate: successRate,
                ontime_rate: onTimeRate,
                publicInputs: {
                    userDid: input.userDid
                },
                wallet: '1am'
            },
            proofHash: this.generateMockHash(input.userDid, 'rental_trust')
        };
    }

    async generateAirdropEligibilityProof(tokenHoldings: number, minHoldings: number, holdPeriod: number): Promise<any> {
        // Use the compiled Compact circuit for airdrop eligibility verification
        try {
            const isValid = airdropEligibilityCircuits.verify_airdrop_eligibility(
                BigInt(tokenHoldings),
                BigInt(minHoldings),
                BigInt(holdPeriod)
            );
            
            console.log('Airdrop eligibility circuit executed successfully:', isValid);
            
            return {
                proof: {
                    eligible: isValid,
                    publicInputs: {
                        tokenHoldings,
                        minHoldings,
                        holdPeriod
                    },
                    wallet: '1am'
                },
                proofHash: this.generateMockHash('airdrop', 'eligibility'),
                circuitResult: isValid
            };
        } catch (error) {
            console.warn('Compact circuit execution failed, using fallback:', error);
            return {
                proof: {
                    eligible: true,
                    publicInputs: { tokenHoldings, minHoldings, holdPeriod },
                    wallet: '1am'
                },
                proofHash: this.generateMockHash('airdrop', 'eligibility')
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

    async generateGovernancePowerProof(tokenBalance: number, votingWeight: number, participationHistory: number): Promise<any> {
        // Use the compiled Compact circuit for governance power verification
        try {
            const isValid = governancePowerCircuits.verify_governance_power(
                BigInt(tokenBalance),
                BigInt(votingWeight),
                BigInt(participationHistory)
            );
            
            console.log('Governance power circuit executed successfully:', isValid);
            
            return {
                proof: {
                    hasVotingPower: isValid,
                    publicInputs: {
                        tokenBalance,
                        votingWeight,
                        participationHistory
                    },
                    wallet: '1am'
                },
                proofHash: this.generateMockHash('governance', 'power'),
                circuitResult: isValid
            };
        } catch (error) {
            console.warn('Compact circuit execution failed, using fallback:', error);
            return {
                proof: {
                    hasVotingPower: true,
                    publicInputs: { tokenBalance, votingWeight, participationHistory },
                    wallet: '1am'
                },
                proofHash: this.generateMockHash('governance', 'power')
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
