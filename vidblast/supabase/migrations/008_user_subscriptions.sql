-- Migration: User Subscriptions & Processed Versions
-- Adds Stripe integration and FFmpeg processed video tracking

-- User subscriptions table for Stripe billing
CREATE TABLE IF NOT EXISTS user_subscriptions (
  user_id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT UNIQUE,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro')),
  blasts_remaining INTEGER DEFAULT 5,
  last_reset TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Users can only read/update their own subscription
CREATE POLICY "Users can view own subscription" 
  ON user_subscriptions FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own subscription" 
  ON user_subscriptions FOR UPDATE 
  USING (auth.uid() = user_id);

-- Add processed_versions column to blasts table
ALTER TABLE blasts ADD COLUMN IF NOT EXISTS processed_versions JSONB DEFAULT NULL;

-- Add version_used column to blast_items to track which version was posted
ALTER TABLE blast_items ADD COLUMN IF NOT EXISTS version_used TEXT;

-- Function to reset monthly blast counts (run via cron)
CREATE OR REPLACE FUNCTION reset_monthly_blast_counts()
RETURNS void AS $$
BEGIN
  UPDATE user_subscriptions 
  SET blasts_remaining = CASE 
    WHEN plan = 'free' THEN 5
    WHEN plan = 'pro' THEN 999999
    ELSE 5
  END,
  last_reset = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create free tier subscription on user signup
CREATE OR REPLACE FUNCTION create_free_subscription()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_subscriptions (user_id, plan, blasts_remaining)
  VALUES (NEW.id, 'free', 5)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Attach trigger to auth.users
DROP TRIGGER IF EXISTS on_auth_user_created_subscription ON auth.users;
CREATE TRIGGER on_auth_user_created_subscription
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_free_subscription();

-- Seed free tier for existing users
INSERT INTO user_subscriptions (user_id, plan, blasts_remaining)
SELECT id, 'free', 5 FROM auth.users
WHERE id NOT IN (SELECT user_id FROM user_subscriptions)
ON CONFLICT (user_id) DO NOTHING;

-- Create index for efficient subscription lookups
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_stripe_customer 
  ON user_subscriptions(stripe_customer_id);

CREATE INDEX IF NOT EXISTS idx_user_subscriptions_stripe_subscription 
  ON user_subscriptions(stripe_subscription_id);
