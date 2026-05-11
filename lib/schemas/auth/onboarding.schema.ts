import { z } from 'zod';

export const onboardingInputSchema = z
  .object({
    name: z.string().min(2, 'Mínimo 2 caracteres').max(50),
    country_name: z.string().min(1, 'Selecciona un país'),
    country_code: z.string().optional(),
    state_name: z.string().min(1, 'Selecciona un estado'),
    city_name: z.string().min(1, 'Selecciona una ciudad'),
    phone_prefix: z.string().optional(),
    phone_number: z.string().optional(),
    instagram: z.string().optional(),
  })
  .refine((data) => data.phone_number || data.instagram, {
    message: 'Agrega al menos WhatsApp o Instagram',
    path: ['phone_number'],
  });

export type OnboardingInput = z.infer<typeof onboardingInputSchema>;
