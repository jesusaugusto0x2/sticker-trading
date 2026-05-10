import styles from './AuthLayout.module.css';

interface AuthLayoutProps {
  hero: React.ReactNode;
  children: React.ReactNode;
}

export function AuthLayout({ hero, children }: AuthLayoutProps) {
  return (
    <div className={styles.layout}>
      <div className={styles.hero}>{hero}</div>
      {children}
    </div>
  );
}
