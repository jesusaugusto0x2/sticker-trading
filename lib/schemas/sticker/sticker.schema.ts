import { z } from 'zod';

export const stickerSchema = z.object({
  id: z.string(),
  album_order: z.number(),
  team_code: z.string().nullable(),
  team_name: z.string().nullable(),
  name: z.string(),
  slot: z.number().optional(),
  type: z.enum(['intro', 'player', 'team_logo', 'team_photo']),
  foil: z.boolean(),
});
export type Sticker = z.infer<typeof stickerSchema>;

export const teamSchema = z.object({
  code: z.string(),
  name: z.string(),
  flag_colors: z.array(z.string()),
  stickers: z.array(stickerSchema),
});
export type Team = z.infer<typeof teamSchema>;
