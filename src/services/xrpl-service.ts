import { Client, Wallet, type Transaction } from 'xrpl';

export async function createNFTOfferWithZKProof(
    client: Client,
    wallet: Wallet,
    nftId: string,
    proofHash: string,
    proofType: 'compliance' | 'rental_trust',
    amount: string = '1000000'
): Promise<any> {
    const transaction: Transaction = {
        TransactionType: 'NFTokenCreateOffer',
        Account: wallet.address,
        NFTokenID: nftId,
        Amount: amount,
        Flags: 1,
        Memos: [{
            Memo: {
                MemoData: Buffer.from(proofHash).toString('hex').substring(0, 2048),
                MemoFormat: Buffer.from(proofType).toString('hex'),
                MemoType: Buffer.from('ZK_PROOF').toString('hex')
            }
        }]
    };

    const prepared = await client.autofill(transaction);
    const signed = wallet.sign(prepared);
    const result = await client.submitAndWait(signed.tx_blob);
    
    return result;
}

export async function extractProofHashFromTransaction(tx: any): Promise<string | null> {
    if (!tx.Memos || tx.Memos.length === 0) return null;
    
    const memo = tx.Memos[0];
    if (!memo.Memo || !memo.Memo.MemoData) return null;
    
    try {
        return Buffer.from(memo.Memo.MemoData, 'hex').toString('utf8');
    } catch {
        return null;
    }
}

export async function extractProofTypeFromTransaction(tx: any): Promise<string | null> {
    if (!tx.Memos || tx.Memos.length === 0) return null;
    
    const memo = tx.Memos[0];
    if (!memo.Memo || !memo.Memo.MemoFormat) return null;
    
    try {
        return Buffer.from(memo.Memo.MemoFormat, 'hex').toString('utf8');
    } catch {
        return null;
    }
}
