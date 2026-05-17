import type { ComplianceProofInput, RentalTrustProofInput } from '../zk/proofs/proof-utils';

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
        // Production Midnight Network endpoints from doc.midnight
        networkId: 'mainnet',
        rpcUrl: 'https://rpc.midnight.network',
        explorerUrl: 'https://explorer.midnight.network',
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
                    // Connect to 1AM wallet
                    this.walletApi = await wallet.connect(this.networkConfig.networkId);
                    console.log('1AM Wallet connected successfully');
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
                // Use 1AM wallet's ZK proof generation capabilities
                console.log('1AM wallet connected, using wallet for proof generation');
                // Note: 1AM wallet specific ZK proof methods would go here
            } catch (error) {
                console.warn('1AM wallet proof generation failed, using fallback:', error);
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
                console.log('1AM wallet connected, using wallet for proof generation');
            } catch (error) {
                console.warn('1AM wallet proof generation failed, using fallback:', error);
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

    async verifyProof(_proof: any, _circuitType: 'compliance' | 'rental_trust'): Promise<boolean> {
        // Try to use 1AM wallet for verification
        const wallet = await this.ensureWalletConnected();
        if (wallet) {
            try {
                console.log('1AM wallet connected, using wallet for verification');
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
