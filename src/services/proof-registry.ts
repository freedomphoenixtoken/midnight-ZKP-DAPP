import { supabase } from '../lib/supabase';

interface ProofRecord {
  id: string;
  proof_hash: string;
  proof_type: 'nft_ownership' | 'xrp_balance' | 'transaction_history' | 'royalty_compliance' | 'trust_line';
  midnight_signature: string;
  xrpl_tx_hash?: string;
  xrpl_address: string;
  midnight_address: string;
  created_at: string;
  expires_at: string;
  is_valid: boolean;
  proof_data: any;
}

export class ProofRegistry {
  // Store a new proof in the registry
  async storeProof(proofData: {
    proofHash: string;
    proofType: 'nft_ownership' | 'xrp_balance' | 'transaction_history' | 'royalty_compliance' | 'trust_line';
    midnightSignature: string;
    xrplAddress: string;
    midnightAddress: string;
    proofData: any;
  }): Promise<string> {
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // 24 hour expiration

    const { data, error } = await supabase
      .from('zk_proofs')
      .insert({
        proof_hash: proofData.proofHash,
        proof_type: proofData.proofType,
        midnight_signature: proofData.midnightSignature,
        xrpl_address: proofData.xrplAddress,
        midnight_address: proofData.midnightAddress,
        proof_data: proofData.proofData,
        expires_at: expiresAt.toISOString(),
        is_valid: true
      })
      .select()
      .single();

    if (error) throw error;
    return data.id;
  }

  // Verify a proof by hash (for marketplace verification)
  async verifyProof(proofHash: string): Promise<ProofRecord | null> {
    const { data, error } = await supabase
      .from('zk_proofs')
      .select('*')
      .eq('proof_hash', proofHash)
      .eq('is_valid', true)
      .single();

    if (error) return null;

    // Check if proof has expired
    if (new Date(data.expires_at) < new Date()) {
      await this.invalidateProof(data.id);
      return null;
    }

    return data;
  }

  // Invalidate a proof
  async invalidateProof(proofId: string): Promise<void> {
    const { error } = await supabase
      .from('zk_proofs')
      .update({ is_valid: false })
      .eq('id', proofId);

    if (error) throw error;
  }

  // Get all valid proofs for an XRPL address (marketplace query)
  async getValidProofsForAddress(xrplAddress: string): Promise<ProofRecord[]> {
    const { data, error } = await supabase
      .from('zk_proofs')
      .select('*')
      .eq('xrpl_address', xrplAddress)
      .eq('is_valid', true)
      .gt('expires_at', new Date().toISOString());

    if (error) throw error;
    return data;
  }

  // Update XRPL transaction hash after verification
  async updateXRPLTxHash(proofId: string, xrplTxHash: string): Promise<void> {
    const { error } = await supabase
      .from('zk_proofs')
      .update({ xrpl_tx_hash: xrplTxHash })
      .eq('id', proofId);

    if (error) throw error;
  }
}
