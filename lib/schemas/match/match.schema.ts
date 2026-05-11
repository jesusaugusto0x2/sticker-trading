import { z } from 'zod';

export const matchSchema = z.object({
  user_id: z.string().uuid(),
  name: z.string(),
  country_code: z.string(),
  country_name: z.string(),
  city_name: z.string(),
  phone_prefix: z.string().nullable(),
  phone_number: z.string().nullable(),
  instagram: z.string().nullable(),
  has_for_me: z.number(),
  i_can_give: z.number(),
});

export type Match = z.infer<typeof matchSchema>;
