'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { Badge, Button, Card, Input, Typography } from '@/components/ui';
import { GoogleIcon } from '@/assets/icons';
import styles from './LoginForm.module.css';
import type { LoginFormProps } from './LoginForm.types';

export type { LoginFormProps } from './LoginForm.types';

export function LoginForm({
  onGoogleLogin,
  onEmailLogin,
  isLoading,
  error,
}: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onEmailLogin(email, password);
  }

  return (
    <div className={styles.form}>
      <Badge dot className={styles.badgeMargin}>Bienvenido de vuelta</Badge>

      <h1 className={styles.headline}>
        Inicia <span className={styles.headlineAccent}>sesión</span>
      </h1>

      <Typography variant="body-lg" color="muted" className={styles.subtitle}>
        Recupera tus repes y matches donde los dejaste.
      </Typography>

      <Button
        variant="secondary"
        fullWidth
        leftIcon={<GoogleIcon size={18} />}
        onClick={onGoogleLogin}
      >
        Continuar con Google
      </Button>

      <div className={styles.divider}>
        <span className={styles.dividerLine} />
        <Typography variant="label" color="muted">
          O con email
        </Typography>
        <span className={styles.dividerLine} />
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.fields}>
          <Input
            type="email"
            label="Correo"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail size={18} />}
            required
          />

          <div>
            <div className={styles.passwordLabelRow}>
              <Typography variant="label" color="muted">
                Contraseña
              </Typography>
              <Link href="/forgot-password" className={styles.forgotLink}>
                ¿Olvidaste?
              </Link>
            </div>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        {error && (
          <Typography variant="body-sm" color="danger">
            {error}
          </Typography>
        )}

        <div className={styles.submitWrapper}>
          <Button type="submit" variant="primary" fullWidth loading={isLoading}>
            Entrar →
          </Button>
        </div>
      </form>

      <Card border="dashed" padding="md" className={styles.registerCard}>
        <Typography variant="body-lg" color="muted">
          ¿Primera vez por aquí? Crea tu cuenta en menos de un minuto.
        </Typography>
        <Link href="/register">
          <Button variant="primary" color="green" fullWidth>
            Registrarme
          </Button>
        </Link>
      </Card>

      <footer className={styles.footer}>
        <Typography variant="caption" color="muted">
          Al continuar aceptas los Términos y la Política de privacidad.
        </Typography>
      </footer>
    </div>
  );
}
