import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';
import { MidnightService } from '../../../../src/services/midnight-service';
import { hashProof } from '../../../../src/zk/proofs/proof-utils';

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const midnightService = new MidnightService();

export const handler: Handler = async (event) => {
    // Enable CORS
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            body: ''
        };
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method not allowed' };
    }

    try {
        const { userAddress, userDid, kycStatus, accreditationLevel } = JSON.parse(event.body || '{}');

        if (!userAddress || !userDid || kycStatus === undefined || accreditationLevel === undefined) {
            return { 
                statusCode: 400, 
                headers: { 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify({ error: 'Missing required fields' })
            };
        }

        const proof = await midnightService.generateComplianceProof({
            userDid,
            kycStatus,
            accreditationLevel,
            verificationTimestamp: Date.now()
        });

        const proofHash = hashProof(proof);
        const expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

        const { error } = await supabase.from('zk_proofs').insert({
            type: 'compliance',
            hash: proofHash,
            user_address: userAddress,
            proof_data: proof,
            expires_at: expiresAt.toISOString()
        });

        if (error) throw error;

        return {
            statusCode: 200,
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({
                proofHash,
                expiresAt: expiresAt.toISOString(),
                type: 'compliance',
                accreditationLevel: proof.proof.accreditation_level
            })
        };
    } catch (error) {
        console.error('Error generating compliance proof:', error);
        return {
            statusCode: 500,
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ error: 'Failed to generate proof' })
        };
    }
};
