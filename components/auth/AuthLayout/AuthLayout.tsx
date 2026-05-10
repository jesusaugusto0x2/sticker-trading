import { ReactNode } from 'react';
import { LoginHero } from '@/components/auth/LoginHero/LoginHero';
import styles from './AuthLayout.module.css';

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className={styles.layout}>
      <div className={styles.hero}>
        <LoginHero />
      </div>
      <div className={styles.form}>{children}</div>
    </div>
  );
}
