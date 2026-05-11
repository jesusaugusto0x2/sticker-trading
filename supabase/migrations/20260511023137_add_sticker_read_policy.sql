CREATE POLICY "Authenticated users can read sticker states"
    ON public.user_sticker_states FOR SELECT
    USING (auth.role() = 'authenticated');