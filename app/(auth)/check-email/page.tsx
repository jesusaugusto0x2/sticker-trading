import Link from 'next/link';
import { MailIcon } from 'lucide-react';
import { AuthLayout } from '@/components/auth/AuthLayout/AuthLayout';
import { Button } from '@/components/ui';
import styles from './page.module.css';

export default function CheckEmailPage() {
  return (
    <AuthLayout>
      <div className={styles.wrapper}>
        <div className={styles.iconWrapper}>
          <MailIcon size={32} />
        </div>
        <h1 className={styles.headline}>
          Revisá tu <span className={styles.headlineAccent}>correo</span>
        </h1>
        <p className={styles.subtitle}>
          Te enviamos un enlace de confirmación. Hacé clic en él para activar tu
          cuenta y continuar.
        </p>
        <Button href="/onboarding" variant="primary" fullWidth>
          ¿Ya verificaste? Continuar →
        </Button>
        <div className={styles.footer}>
          <Link href="/login" className={styles.backLink}>
            Volver al inicio de sesión
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
