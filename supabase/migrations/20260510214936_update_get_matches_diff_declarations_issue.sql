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
DECLARE
    v_user_id      UUID := p_user_id;
    v_country_code TEXT;
BEGIN
    SELECT p.country_code INTO v_country_code
    FROM public.profiles p
    WHERE p.user_id = v_user_id;

    RETURN QUERY
    WITH match_counts AS (
        SELECT
        p.user_id        AS mc_user_id,
        p.nombre         AS mc_nombre,
        p.country_code   AS mc_country_code,
        p.country_name   AS mc_country_name,
        p.city_name      AS mc_city_name,
        p.phone_prefix   AS mc_phone_prefix,
        p.phone_number   AS mc_phone_number,
        p.instagram      AS mc_instagram,
        (
            SELECT COUNT(*) FROM user_repeated_stickers urs
            JOIN user_missing_stickers ums
            ON  ums.sticker_id = urs.sticker_id
            AND ums.user_id    = v_user_id
            WHERE urs.user_id = p.user_id
        ) AS mc_has_for_me,
        (
            SELECT COUNT(*) FROM user_repeated_stickers urs
            JOIN user_missing_stickers ums
            ON  ums.sticker_id = urs.sticker_id
            AND ums.user_id    = p.user_id
            WHERE urs.user_id = v_user_id
        ) AS mc_i_can_give
        FROM public.profiles p
        WHERE p.user_id      != v_user_id
        AND p.country_code  = v_country_code
    )
    SELECT
        mc.mc_user_id, mc.mc_nombre, mc.mc_country_code, mc.mc_country_name,
        mc.mc_city_name, mc.mc_phone_prefix, mc.mc_phone_number, mc.mc_instagram,
        mc.mc_has_for_me, mc.mc_i_can_give
    FROM match_counts mc
    WHERE mc.mc_has_for_me > 0
        OR mc.mc_i_can_give > 0
    ORDER BY (mc.mc_has_for_me + mc.mc_i_can_give) DESC;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_matches(UUID) TO authenticated;