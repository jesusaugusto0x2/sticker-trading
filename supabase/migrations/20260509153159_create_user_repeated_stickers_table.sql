CREATE TABLE user_repeated_stickers (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID REFERENCES profiles(user_id) ON DELETE CASCADE NOT NULL,
  sticker_id  TEXT NOT NULL,
  quantity    INTEGER DEFAULT 1 CHECK (quantity > 0),
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, sticker_id)
);

-- RLS
ALTER TABLE user_repeated_stickers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all repeated stickers"
  ON user_repeated_stickers FOR SELECT
  USING (true);

CREATE POLICY "Users can only manage their own repeated stickers"
  ON user_repeated_stickers FOR ALL
  USING (auth.uid() = user_id);