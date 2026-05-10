ALTER TABLE public.profiles
    ALTER COLUMN nombre DROP NOT NULL,
    ALTER COLUMN country_code DROP NOT NULL,
    ALTER COLUMN country_name DROP NOT NULL,
    ALTER COLUMN state_name DROP NOT NULL,
    ALTER COLUMN city_name DROP NOT NULL;