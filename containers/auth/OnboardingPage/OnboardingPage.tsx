'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCurrentUser } from '@/hooks';
import { AuthLayout } from '@/components/auth/AuthLayout/AuthLayout';
import { OnboardingForm } from '@/components/auth/OnboardingForm/OnboardingForm';
import type { OnboardingInput } from '@/lib/schemas/auth';

export function OnboardingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, loading: loadingUser } = useCurrentUser();

  const handleSubmit = async (data: OnboardingInput) => {
    setIsLoading(true);
    setError(null);

    const res = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const { error: apiError } = await res.json();
      setError(apiError ?? 'Error al guardar el perfil');
    } else {
      router.push('/repes');
    }

    setIsLoading(false);
  };

  if (loadingUser) return null;
  if (!user) return null;

  return (
    <AuthLayout>
      <OnboardingForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
        defaultName={user.user_metadata?.full_name ?? ''}
      />
    </AuthLayout>
  );
}
