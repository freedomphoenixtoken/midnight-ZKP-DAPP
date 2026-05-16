import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';
import { MidnightService } from '../../../../src/services/midnight-service';
import { hashProof } from '../../../../src/zk/proofs/proof-utils';

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const midnightService = new MidnightService();

function calculateRentalStats(rentals: any[]) {
    const total = rentals.length;
    const successful = rentals.filter((r: any) => r.status === 'completed').length;
    const onTime = rentals.filter((r: any) => r.returned_on_time === true).length;
    const lastRental = rentals.reduce((latest, r) => 
        new Date(r.created_at) > new Date(latest.created_at) ? r : latest
    , rentals[0]);

    return {
        total,
        successful,
        onTime,
        lastRentalTimestamp: new Date(lastRental.created_at).getTime()
    };
}

export const handler: Handler = async (event) => {
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
        const { userAddress, userDid } = JSON.parse(event.body || '{}');

        if (!userAddress || !userDid) {
            return { 
                statusCode: 400, 
                headers: { 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify({ error: 'Missing required fields' })
            };
        }

        const { data: rentals, error } = await supabase
            .from('rentals')
            .select('*')
            .eq('user_address', userAddress);

        if (error) throw error;

        if (!rentals || rentals.length < 3) {
            return {
                statusCode: 400,
                headers: { 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify({ error: 'Insufficient rental history (minimum 3 rentals required)' })
            };
        }

        const stats = calculateRentalStats(rentals);

        const proof = await midnightService.generateRentalTrustProof({
            userDid,
            totalRentals: stats.total,
            successfulRentals: stats.successful,
            onTimeReturns: stats.onTime,
            lastRentalTimestamp: stats.lastRentalTimestamp
        });

        const proofHash = hashProof(proof);
        const expiresAt = new Date(Date.now() + 180 * 24 * 60 * 60 * 1000);

        const { error: insertError } = await supabase.from('zk_proofs').insert({
            type: 'rental_trust',
            hash: proofHash,
            user_address: userAddress,
            proof_data: proof,
            expires_at: expiresAt.toISOString()
        });

        if (insertError) throw insertError;

        return {
            statusCode: 200,
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({
                proofHash,
                expiresAt: expiresAt.toISOString(),
                type: 'rental_trust',
                stats: {
                    successRate: proof.proof.success_rate,
                    onTimeRate: proof.proof.ontime_rate,
                    totalRentals: stats.total
                }
            })
        };
    } catch (error) {
        console.error('Error generating rental trust proof:', error);
        return {
            statusCode: 500,
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ error: 'Failed to generate proof' })
        };
    }
};
