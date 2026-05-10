'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { AuthLayout } from '@/components/auth/AuthLayout/AuthLayout';
import { OnboardingForm } from '@/components/auth/OnboardingForm/OnboardingForm';
import type { OnboardingInput } from '@/lib/schemas/auth';

export function OnboardingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
  }, []);

  const handleSubmit = async (data: OnboardingInput) => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    const { error: dbError } = await supabase
      .from('profiles')
      .upsert({
        user_id: user.id,
        nombre: data.nombre,
        country_code: data.country_code ?? '',
        country_name: data.country_name,
        state_name: data.state_name,
        city_name: data.city_name,
        phone_prefix: data.phone_prefix ?? null,
        phone_number: data.phone_number ?? null,
        instagram: data.instagram ?? null,
        updated_at: new Date().toISOString(),
      });

    if (dbError) {
      setError(dbError.message);
    } else {
      router.push('/repes');
    }

    setIsLoading(false);
  };

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
