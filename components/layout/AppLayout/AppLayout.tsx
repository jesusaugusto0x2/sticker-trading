'use client';

import { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { useCurrentUser } from '@/hooks';
import { generateSlug } from '@/lib/utils/slug';
import { Sidebar } from '@/components/layout/Sidebar/Sidebar';
import { BottomNav } from '@/components/layout/BottomNav/BottomNav';
import styles from './AppLayout.module.css';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { user } = useCurrentUser();
  const [copied, setCopied] = useState(false);

  const userName = user?.user_metadata?.full_name ?? '';
  const userCity = '';
  const userSlug = user ? generateSlug(userName, user.id) : undefined;

  const handleShare = () => {
    if (!userSlug) return;
    navigator.clipboard.writeText(`${window.location.origin}/u/${userSlug}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <Sidebar userName={userName} userCity={userCity} userSlug={userSlug} />
      </div>

      <main className={styles.main}>{children}</main>

      <div className={styles.bottomNav}>
        <BottomNav />
      </div>

      {userSlug && (
        <button
          className={`${styles.shareFab} ${copied ? styles.shareFabCopied : ''}`}
          onClick={handleShare}
          aria-label="Compartir mi perfil"
        >
          {copied ? <Check size={20} /> : <Share2 size={20} />}
        </button>
      )}
    </div>
  );
}
