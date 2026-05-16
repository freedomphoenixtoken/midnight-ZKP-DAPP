import crypto from 'crypto-js';

export interface ComplianceProofInput {
    userDid: string;
    kycStatus: boolean;
    accreditationLevel: number;
    verificationTimestamp: number;
}

export interface RentalTrustProofInput {
    userDid: string;
    totalRentals: number;
    successfulRentals: number;
    onTimeReturns: number;
    lastRentalTimestamp: number;
}

export function hashProof(proof: any): string {
    return crypto.SHA256(JSON.stringify(proof)).toString();
}

export function isProofExpired(expiresAt: Date | null): boolean {
    if (!expiresAt) return false;
    return new Date() > expiresAt;
}
