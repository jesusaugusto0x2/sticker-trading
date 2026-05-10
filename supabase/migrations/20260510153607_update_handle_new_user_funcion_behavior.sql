CREATE OR REPLACE FUNCTION public.handle_new_user()
    RETURNS trigger AS $$
    BEGIN
        INSERT INTO public.profiles (user_id)
        VALUES (new.id);
        RETURN new;
    END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
