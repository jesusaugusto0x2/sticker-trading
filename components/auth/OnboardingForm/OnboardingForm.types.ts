import type { OnboardingInput } from '@/lib/schemas/auth';

export type { OnboardingInput } from '@/lib/schemas/auth';

export interface OnboardingFormProps {
  onSubmit: (data: OnboardingInput) => void;
  isLoading: boolean;
  error: string | null;
  defaultName?: string;
}
