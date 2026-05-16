-- ZK Proofs table
CREATE TABLE IF NOT EXISTS zk_proofs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type TEXT NOT NULL CHECK (type IN ('compliance', 'rental_trust')),
    hash TEXT NOT NULL UNIQUE,
    user_address TEXT NOT NULL,
    proof_data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE,
    is_revoked BOOLEAN DEFAULT FALSE
);

-- Rentals table for trust score tracking
CREATE TABLE IF NOT EXISTS rentals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_address TEXT NOT NULL,
    nft_id TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'completed', 'cancelled')),
    rental_start TIMESTAMP WITH TIME ZONE,
    rental_end TIMESTAMP WITH TIME ZONE,
    returned_on_time BOOLEAN,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    trust_score_verified BOOLEAN DEFAULT FALSE,
    zk_proof_hash TEXT,
    trust_score_metadata JSONB
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_zk_proofs_hash ON zk_proofs(hash);
CREATE INDEX IF NOT EXISTS idx_zk_proofs_user_address ON zk_proofs(user_address);
CREATE INDEX IF NOT EXISTS idx_zk_proofs_type ON zk_proofs(type);
CREATE INDEX IF NOT EXISTS idx_rentals_user_address ON rentals(user_address);
CREATE INDEX IF NOT EXISTS idx_rentals_nft_id ON rentals(nft_id);
CREATE INDEX IF NOT EXISTS idx_rentals_status ON rentals(status);

-- Row Level Security
ALTER TABLE zk_proofs ENABLE ROW LEVEL SECURITY;
ALTER TABLE rentals ENABLE ROW LEVEL SECURITY;

-- Policies for zk_proofs
DROP POLICY IF EXISTS "Users can view their own proofs" ON zk_proofs;
CREATE POLICY "Users can view their own proofs"
  ON zk_proofs FOR SELECT
  USING (auth.uid()::text = user_address);

DROP POLICY IF EXISTS "Service role can insert proofs" ON zk_proofs;
CREATE POLICY "Service role can insert proofs"
  ON zk_proofs FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Service role can update proofs" ON zk_proofs;
CREATE POLICY "Service role can update proofs"
  ON zk_proofs FOR UPDATE
  USING (true);

-- Policies for rentals
DROP POLICY IF EXISTS "Users can view their own rentals" ON rentals;
CREATE POLICY "Users can view their own rentals"
  ON rentals FOR SELECT
  USING (auth.uid()::text = user_address);

DROP POLICY IF EXISTS "Service role can manage rentals" ON rentals;
CREATE POLICY "Service role can manage rentals"
  ON rentals FOR ALL
  WITH CHECK (true);
