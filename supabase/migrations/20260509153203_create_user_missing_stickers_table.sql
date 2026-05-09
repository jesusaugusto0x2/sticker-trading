CREATE TABLE user_missing_stickers (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID REFERENCES profiles(user_id) ON DELETE CASCADE NOT NULL,
  sticker_id  TEXT NOT NULL,
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, sticker_id)
);

-- RLS
ALTER TABLE user_missing_stickers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all missing stickers"
  ON user_missing_stickers FOR SELECT
  USING (true);

CREATE POLICY "Users can only manage their own missing stickers"
  ON user_missing_stickers FOR ALL
  USING (auth.uid() = user_id);