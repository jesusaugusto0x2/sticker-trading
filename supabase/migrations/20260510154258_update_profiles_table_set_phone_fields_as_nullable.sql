ALTER TABLE public.profiles
    ALTER COLUMN phone_prefix DROP NOT NULL,
    ALTER COLUMN phone_number DROP NOT NULL;