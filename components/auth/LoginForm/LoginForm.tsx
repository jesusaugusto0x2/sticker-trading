'use client';

import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { Badge, Button, Card, Input, Typography } from '@/components/ui';
import { GoogleIcon } from '@/assets/icons';
import styles from './LoginForm.module.css';
import type { LoginFormProps, LoginFormData } from './LoginForm.types';

export type { LoginFormProps, LoginFormData } from './LoginForm.types';

export function LoginForm({
  onGoogleLogin,
  onEmailLogin,
  isLoading,
  error,
}: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  return (
    <div className={styles.form}>
      <div className={styles.mobileLogo}>
        <div className={styles.mobileLogoIcon}>R</div>
        <span className={styles.mobileLogoText}>repes26</span>
      </div>

      <Badge dot className={styles.badgeMargin}>
        Bienvenido de vuelta
      </Badge>

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

      <form onSubmit={handleSubmit(onEmailLogin)}>
        <div className={styles.fields}>
          <Input
            type="email"
            label="Correo"
            placeholder="tu@email.com"
            leftIcon={<Mail size={18} />}
            state={errors.email ? 'error' : 'default'}
            errorMessage={errors.email?.message}
            {...register('email', { required: 'El correo es requerido' })}
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
              state={errors.password ? 'error' : 'default'}
              errorMessage={errors.password?.message}
              {...register('password', {
                required: 'La contraseña es requerida',
                minLength: { value: 6, message: 'Mínimo 6 caracteres' },
              })}
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
        <Typography
          variant="body-lg"
          color="muted"
          className={styles.registerText}
        >
          ¿Primera vez por aquí? Crea tu cuenta en menos de un minuto.
        </Typography>
        <Button
          href="/register"
          variant="primary"
          color="green"
          fullWidth
          className={styles.registerAction}
        >
          Registrarme
        </Button>
      </Card>

      <footer className={styles.footer}>
        <Typography variant="caption" color="muted">
          Al continuar aceptas los Términos y la Política de privacidad.
        </Typography>
      </footer>
    </div>
  );
}
