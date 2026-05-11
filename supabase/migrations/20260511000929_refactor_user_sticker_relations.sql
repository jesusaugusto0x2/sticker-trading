-- ============================================================
-- 1. Rename column 'nombre' → 'name' in profiles (idempotent)
-- ============================================================
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'nombre'
  ) THEN
    ALTER TABLE public.profiles RENAME COLUMN nombre TO name;
  END IF;
END $$;

-- ============================================================
-- 2. New unified table for sticker states
-- ============================================================
CREATE TABLE IF NOT EXISTS public.user_sticker_states (
  user_id    UUID        NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  sticker_id TEXT        NOT NULL,
  state      TEXT        NOT NULL CHECK (state IN ('placed', 'repeated')),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, sticker_id)
);

ALTER TABLE public.user_sticker_states ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage own sticker states" ON public.user_sticker_states;
CREATE POLICY "Users can manage own sticker states"
  ON public.user_sticker_states FOR ALL
  USING  (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- 3. Migrate repeated stickers → 'repeated' (only if source table still exists)
-- ============================================================
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'user_repeated_stickers'
  ) THEN
    INSERT INTO public.user_sticker_states (user_id, sticker_id, state)
    SELECT user_id, sticker_id, 'repeated'
    FROM public.user_repeated_stickers
    ON CONFLICT DO NOTHING;
  END IF;
END $$;

-- ============================================================
-- 4. Drop old tables
-- ============================================================
DROP TABLE IF EXISTS public.user_missing_stickers;
DROP TABLE IF EXISTS public.user_repeated_stickers;

-- ============================================================
-- 5. Replace get_matches function (DROP first to allow return type change)
-- ============================================================
DROP FUNCTION IF EXISTS public.get_matches(UUID);

CREATE FUNCTION public.get_matches(p_user_id UUID)
RETURNS TABLE (
  user_id      UUID,
  name         TEXT,
  country_code TEXT,
  country_name TEXT,
  city_name    TEXT,
  phone_prefix TEXT,
  phone_number TEXT,
  instagram    TEXT,
  has_for_me   BIGINT,
  i_can_give   BIGINT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id      UUID := p_user_id;
  v_country_code TEXT;
BEGIN
  SELECT p.country_code INTO v_country_code
  FROM public.profiles p
  WHERE p.user_id = v_user_id;

  RETURN QUERY
  WITH
  my_repeated AS (
    SELECT sticker_id
    FROM public.user_sticker_states
    WHERE user_id = v_user_id AND state = 'repeated'
  ),
  my_states AS (
    SELECT sticker_id
    FROM public.user_sticker_states
    WHERE user_id = v_user_id
  ),
  candidates AS (
    SELECT
      p.user_id    AS mc_uid,
      p.name, p.country_code, p.country_name,
      p.city_name, p.phone_prefix, p.phone_number, p.instagram
    FROM public.profiles p
    WHERE p.country_code = v_country_code
      AND p.user_id != v_user_id
  ),
  mc_gives AS (
    SELECT
      uss.user_id  AS mc_giver_id,
      COUNT(*)     AS mc_has_for_me
    FROM public.user_sticker_states uss
    WHERE uss.state = 'repeated'
      AND uss.user_id IN (SELECT mc_uid FROM candidates)
      AND uss.sticker_id NOT IN (SELECT sticker_id FROM my_states)
    GROUP BY uss.user_id
  ),
  mc_receives AS (
    SELECT
      c.mc_uid     AS mc_receiver_id,
      COUNT(mr.sticker_id) AS mc_i_can_give
    FROM candidates c
    CROSS JOIN my_repeated mr
    WHERE NOT EXISTS (
      SELECT 1
      FROM public.user_sticker_states their_uss
      WHERE their_uss.user_id    = c.mc_uid
        AND their_uss.sticker_id = mr.sticker_id
    )
    GROUP BY c.mc_uid
  )
  SELECT
    c.mc_uid,
    c.name,
    c.country_code,
    c.country_name,
    c.city_name,
    c.phone_prefix,
    c.phone_number,
    c.instagram,
    COALESCE(g.mc_has_for_me, 0)::BIGINT AS has_for_me,
    COALESCE(r.mc_i_can_give, 0)::BIGINT AS i_can_give
  FROM candidates c
  LEFT JOIN mc_gives    g ON g.mc_giver_id    = c.mc_uid
  LEFT JOIN mc_receives r ON r.mc_receiver_id = c.mc_uid
  WHERE COALESCE(g.mc_has_for_me, 0) > 0
     OR COALESCE(r.mc_i_can_give, 0) > 0
  ORDER BY (COALESCE(g.mc_has_for_me, 0) + COALESCE(r.mc_i_can_give, 0)) DESC;
END;
$$;
