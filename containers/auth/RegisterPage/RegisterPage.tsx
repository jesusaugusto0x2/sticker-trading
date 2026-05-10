'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { AuthLayout } from '@/components/auth/AuthLayout/AuthLayout';
import { RegisterForm } from '@/components/auth/RegisterForm/RegisterForm';
import type { RegisterInput } from '@/lib/schemas/auth';

export function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async ({ email, password }: RegisterInput) => {
    setIsLoading(true);
    setError(null);

    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (authError) {
      console.error('Error during registration:', authError);
      setError(authError.message);
    } else {
      router.push('/check-email');
    }

    setIsLoading(false);
  };

  return (
    <AuthLayout>
      <RegisterForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
      />
    </AuthLayout>
  );
}
