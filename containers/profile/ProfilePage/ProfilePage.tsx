'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import stickersData from '@/lib/data/stickers.json';
import { supabase } from '@/lib/supabase';
import { Button, Typography } from '@/components/ui';
import { ProfileHeroCard } from '@/components/profile/ProfileHeroCard/ProfileHeroCard';
import { ContactCard } from '@/components/profile/ContactCard/ContactCard';
import type { ContactCardSaveData } from '@/components/profile/ContactCard/ContactCard';
import styles from './ProfilePage.module.css';

const totalStickerCount =
  (stickersData.intro as unknown[]).length +
  (stickersData.teams as { stickers: unknown[] }[]).reduce(
    (acc, t) => acc + t.stickers.length,
    0,
  );

interface ProfileData {
  name: string;
  country_code: string;
  state_name: string;
  city_name: string;
  phone_prefix: string | null;
  phone_number: string | null;
  instagram: string | null;
  placed_count: number;
  repeated_count: number;
}

export function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/profile')
      .then((r) => r.json())
      .then((data) => setProfile(data));
  }, []);

  const handleSave = async (data: ContactCardSaveData) => {
    setSaving(true);
    setSaveError(null);
    const res = await fetch('/api/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const json = await res.json();
      setSaveError(json.error ?? 'Error al guardar');
    } else {
      setProfile((prev) => (prev ? { ...prev, ...data } : prev));
    }
    setSaving(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (!profile) return null;

  return (
    <div className={styles.page}>
      <Typography variant="h1">Mi perfil</Typography>

      <ProfileHeroCard
        name={profile.name}
        countryCode={profile.country_code}
        stateName={profile.state_name}
        cityName={profile.city_name}
        placedCount={profile.placed_count}
        repeatedCount={profile.repeated_count}
        totalCount={totalStickerCount}
      />

      <ContactCard
        phonePrefix={profile.phone_prefix}
        phoneNumber={profile.phone_number}
        instagram={profile.instagram}
        cityName={profile.city_name}
        stateName={profile.state_name}
        onSave={handleSave}
        saving={saving}
      />

      {saveError && (
        <Typography variant="body-sm" color="danger">
          {saveError}
        </Typography>
      )}

      <Button variant="ghost" onClick={handleLogout} className={styles.logout}>
        <LogOut size={18} />
        Cerrar sesión
      </Button>
    </div>
  );
}
