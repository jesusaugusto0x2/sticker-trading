export interface LoginFormProps {
  onGoogleLogin: () => void;
  onEmailLogin: (email: string, password: string) => void;
  isLoading: boolean;
  error: string | null;
}
