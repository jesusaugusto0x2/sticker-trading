import { z } from 'zod';

export const profileSchema = z.object({
  user_id: z.string().uuid(),
  nombre: z.string(),
  country_code: z.string(),
  country_name: z.string(),
  state_name: z.string(),
  city_name: z.string(),
  phone_prefix: z.string().nullable(),
  phone_number: z.string().nullable(),
  instagram: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Profile = z.infer<typeof profileSchema>;
