import type { RegisterInput } from '@/lib/schemas/auth';

export type { RegisterInput } from '@/lib/schemas/auth';

export interface RegisterFormProps {
  onSubmit: (data: RegisterInput) => void;
  isLoading: boolean;
  error: string | null;
}
