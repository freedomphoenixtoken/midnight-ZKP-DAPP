import { Client, Wallet, type Transaction } from 'xrpl';

// XRPL Testnet and Mainnet endpoints
const TESTNET_URL = 'https://s.altnet.rippletest.net:51234';
const MAINNET_URL = 'https://s1.ripple.com:51234';

let client: Client | null = null;

export async function getClient(useMainnet = false): Promise<Client> {
    if (!client) {
        client = new Client(useMainnet ? MAINNET_URL : TESTNET_URL);
        await client.connect();
    }
    return client;
}

export async function disconnectClient() {
    if (client) {
        await client.disconnect();
        client = null;
    }
}

export async function getWalletData(address: string, useMainnet = false): Promise<{
    walletAge: number;
    transactionCount: number;
    xrpBalance: number;
    holdsXRP: boolean;
    firstTransactionDate: Date | null;
}> {
    try {
        const client = await getClient(useMainnet);
        
        // Get account info
        const accountInfo = await client.request({
            command: 'account_info',
            account: address,
            ledger_index: 'validated'
        });

        const xrpBalance = Number(accountInfo.result.account_data.Balance) / 1000000;
        const holdsXRP = xrpBalance > 0;

        // Get transactions to calculate wallet age and count
        const transactions = await client.request({
            command: 'account_tx',
            account: address,
            ledger_index_min: -1,
            ledger_index_max: -1,
            limit: 1000,
            binary: false
        });

        const txs = transactions.result.transactions || [];
        const transactionCount = txs.length;
        
        let walletAge = 0;
        let firstTransactionDate: Date | null = null;

        if (txs.length > 0) {
            const firstTx = txs[txs.length - 1]; // Oldest transaction
            // XRPL transactions don't have a direct date field, we need to get it from the ledger
            const ledger = await client.request({
                command: 'ledger',
                ledger_index: firstTx.ledger_index
            });
            firstTransactionDate = new Date(ledger.result.ledger.close_time * 1000);
            const now = new Date();
            const diffTime = now.getTime() - firstTransactionDate.getTime();
            walletAge = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        }

        return {
            walletAge,
            transactionCount,
            xrpBalance,
            holdsXRP,
            firstTransactionDate
        };
    } catch (error) {
        console.error('Error fetching wallet data:', error);
        throw new Error('Failed to fetch wallet data from XRPL');
    }
}

export async function getNFTHoldings(address: string, useMainnet = false): Promise<{
    nftCount: number;
    nftIds: string[];
}> {
    try {
        const client = await getClient(useMainnet);
        
        const nfts = await client.request({
            command: 'account_nfts',
            account: address,
            ledger_index: 'validated'
        });

        const nftIds = nfts.result.account_nfts?.map((nft: any) => nft.NFTokenID) || [];
        
        return {
            nftCount: nftIds.length,
            nftIds
        };
    } catch (error) {
        console.error('Error fetching NFT holdings:', error);
        return {
            nftCount: 0,
            nftIds: []
        };
    }
}

export async function getTrustLines(address: string, useMainnet = false): Promise<any[]> {
    try {
        const client = await getClient(useMainnet);
        
        const trustLines = await client.request({
            command: 'account_lines',
            account: address,
            ledger_index: 'validated'
        });

        return trustLines.result.lines || [];
    } catch (error) {
        console.error('Error fetching trust lines:', error);
        return [];
    }
}

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

export async function sendVerificationCodeTransaction(
    client: Client,
    wallet: Wallet,
    verificationCode: string,
    destinationAddress?: string,
    amount: string = '1'
): Promise<any> {
    const transaction: Transaction = {
        TransactionType: 'Payment',
        Account: wallet.address,
        Amount: amount,
        Destination: destinationAddress || wallet.address,
        Memos: [{
            Memo: {
                MemoData: Buffer.from(verificationCode).toString('hex').substring(0, 2048),
                MemoFormat: Buffer.from('VERIFICATION_CODE').toString('hex'),
                MemoType: Buffer.from('ZK_IDENTITY').toString('hex')
            }
        }]
    };

    const prepared = await client.autofill(transaction);
    const signed = wallet.sign(prepared);
    const result = await client.submitAndWait(signed.tx_blob);
    
    return result;
}

export async function extractVerificationCodeFromTransaction(tx: any): Promise<string | null> {
    if (!tx.Memos || tx.Memos.length === 0) return null;
    
    const memo = tx.Memos[0];
    if (!memo.Memo || !memo.Memo.MemoData) return null;
    
    try {
        const memoFormat = memo.Memo.MemoFormat ? Buffer.from(memo.Memo.MemoFormat, 'hex').toString('utf8') : '';
        if (memoFormat === 'VERIFICATION_CODE') {
            return Buffer.from(memo.Memo.MemoData, 'hex').toString('utf8');
        }
        return null;
    } catch {
        return null;
    }
}
