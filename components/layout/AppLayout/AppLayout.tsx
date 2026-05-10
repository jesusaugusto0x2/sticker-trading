'use client';

import { useCurrentUser } from '@/hooks';
import { Sidebar } from '@/components/layout/Sidebar/Sidebar';
import { BottomNav } from '@/components/layout/BottomNav/BottomNav';
import styles from './AppLayout.module.css';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { user } = useCurrentUser();

  const userName = user?.user_metadata?.full_name ?? '';
  const userCity = '';

  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <Sidebar userName={userName} userCity={userCity} />
      </div>

      <main className={styles.main}>{children}</main>

      <div className={styles.bottomNav}>
        <BottomNav />
      </div>
    </div>
  );
}
