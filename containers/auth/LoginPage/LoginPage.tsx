'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { AuthLayout } from '@/components/auth/AuthLayout/AuthLayout';
import { LoginHero } from '@/components/auth/LoginHero/LoginHero';
import { LoginForm } from '@/components/auth/LoginForm/LoginForm';

export function LoginPage() {
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

  const handleEmailLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (authError) setError(authError.message);
    setIsLoading(false);
  };

  return (
    <AuthLayout hero={<LoginHero />}>
      <LoginForm
        onGoogleLogin={handleGoogleLogin}
        onEmailLogin={handleEmailLogin}
        isLoading={isLoading}
        error={error}
      />
    </AuthLayout>
  );
}
