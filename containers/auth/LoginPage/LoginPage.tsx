'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { AuthLayout } from '@/components/auth/AuthLayout/AuthLayout';
import { LoginForm } from '@/components/auth/LoginForm/LoginForm';
import { LoginInput } from '@/lib/schemas/auth';

export function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    setIsLoading(false);
  };

  const handleEmailLogin = async ({ email, password }: LoginInput) => {
    setIsLoading(true);
    setError(null);

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log('Login response:', { data, authError });

    if (authError) {
      setError(authError.message);
      return;
    }

    setIsLoading(false);
    router.push('/repes');
  };

  return (
    <AuthLayout>
      <LoginForm
        onGoogleLogin={handleGoogleLogin}
        onEmailLogin={handleEmailLogin}
        isLoading={isLoading}
        error={error}
      />
    </AuthLayout>
  );
}
