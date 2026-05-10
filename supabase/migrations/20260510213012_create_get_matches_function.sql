CREATE OR REPLACE FUNCTION public.get_matches(p_user_id UUID)
RETURNS TABLE (
    user_id      UUID,
    nombre       TEXT,
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
BEGIN
    RETURN QUERY
    WITH match_counts AS (
        SELECT
            p.user_id,
            p.nombre,
            p.country_code,
            p.country_name,
            p.city_name,
            p.phone_prefix,
            p.phone_number,
            p.instagram,
            (
                SELECT COUNT(*)
                FROM user_repeated_stickers urs
                JOIN user_missing_stickers ums
                ON  ums.sticker_id = urs.sticker_id
                AND ums.user_id    = p_user_id
                WHERE urs.user_id = p.user_id
            ) AS has_for_me,
            (
                SELECT COUNT(*)
                FROM user_repeated_stickers urs
                JOIN user_missing_stickers ums
                ON  ums.sticker_id = urs.sticker_id
                AND ums.user_id    = p.user_id
                WHERE urs.user_id = p_user_id
            ) AS i_can_give
        FROM public.profiles p
        WHERE p.user_id != p_user_id
    )
    SELECT *
    FROM match_counts
    WHERE has_for_me > 0
        OR i_can_give > 0
    ORDER BY (has_for_me + i_can_give) DESC;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_matches(UUID) TO authenticated;