export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginFormProps {
  onGoogleLogin: () => void;
  onEmailLogin: (data: LoginFormData) => void;
  isLoading: boolean;
  error: string | null;
}
