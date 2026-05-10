import type { LoginInput } from '@/lib/schemas/auth';

export interface LoginFormProps {
  onGoogleLogin: () => void;
  onEmailLogin: (data: LoginInput) => void;
  isLoading: boolean;
  error: string | null;
}
