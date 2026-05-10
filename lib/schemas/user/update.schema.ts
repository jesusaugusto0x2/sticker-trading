import { z } from 'zod';
import { profileSchema } from './profile.schema';

export const updateProfileInputSchema = profileSchema
  .omit({ user_id: true, created_at: true, updated_at: true })
  .partial();

export type UpdateProfileInput = z.infer<typeof updateProfileInputSchema>;
