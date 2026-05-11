-- Fix "column reference user_id is ambiguous" in get_matches.
-- When RETURNS TABLE declares a column named user_id, PL/pgSQL treats it as
-- an output variable, making unqualified user_id references ambiguous.
-- Fix: fully qualify every user_id with its table alias.

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
SELECT mr.sticker_id
FROM public.user_sticker_states mr
WHERE mr.user_id = v_user_id
    AND mr.state = 'repeated'
),
my_states AS (
SELECT ms.sticker_id
FROM public.user_sticker_states ms
WHERE ms.user_id = v_user_id
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
    c.mc_uid          AS mc_receiver_id,
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
COALESCE(g.mc_has_for_me, 0)::BIGINT  AS has_for_me,
COALESCE(r.mc_i_can_give, 0)::BIGINT  AS i_can_give
FROM candidates c
LEFT JOIN mc_gives    g ON g.mc_giver_id    = c.mc_uid
LEFT JOIN mc_receives r ON r.mc_receiver_id = c.mc_uid
WHERE COALESCE(g.mc_has_for_me, 0) > 0
    OR COALESCE(r.mc_i_can_give, 0) > 0
ORDER BY (COALESCE(g.mc_has_for_me, 0) + COALESCE(r.mc_i_can_give, 0)) DESC;
END;
$$;
