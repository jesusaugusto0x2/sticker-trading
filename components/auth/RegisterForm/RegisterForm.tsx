'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Mail, Lock } from 'lucide-react';
import { registerInputSchema } from '@/lib/schemas/auth';
import { Badge, Button, Input, Typography } from '@/components/ui';
import styles from './RegisterForm.module.css';
import type { RegisterFormProps, RegisterInput } from './RegisterForm.types';

export type { RegisterFormProps, RegisterInput } from './RegisterForm.types';

export function RegisterForm({
  onSubmit,
  isLoading,
  error,
}: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerInputSchema) });

  return (
    <div className={styles.form}>
      <div className={styles.mobileLogo}>
        <div className={styles.mobileLogoIcon}>R</div>
        <span className={styles.mobileLogoText}>cromos26</span>
      </div>

      <Badge dot className={styles.badgeMargin}>
        Bienvenido de vuelta
      </Badge>

      <h1 className={styles.headline}>
        Crea tu <span className={styles.headlineAccent}>cuenta</span>
      </h1>

      <Typography variant="body-lg" color="muted" className={styles.subtitle}>
        Empieza a intercambiar tus cromos.
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.fields}>
          <Input
            type="email"
            label="Correo"
            placeholder="tu@email.com"
            leftIcon={<Mail size={18} />}
            state={errors.email ? 'error' : 'default'}
            errorMessage={errors.email?.message}
            {...register('email')}
          />

          <Input
            type="password"
            label="Contraseña"
            placeholder="••••••••"
            leftIcon={<Lock size={18} />}
            state={errors.password ? 'error' : 'default'}
            errorMessage={errors.password?.message}
            {...register('password')}
          />

          <Input
            type="password"
            label="Confirmar contraseña"
            placeholder="••••••••"
            leftIcon={<Lock size={18} />}
            state={errors.confirmPassword ? 'error' : 'default'}
            errorMessage={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />
        </div>

        {error && (
          <Typography variant="body-sm" color="danger">
            {error}
          </Typography>
        )}

        <div className={styles.submitWrapper}>
          <Button type="submit" variant="primary" fullWidth loading={isLoading}>
            Crear cuenta →
          </Button>
        </div>
      </form>

      <footer className={styles.footer}>
        <Typography variant="caption" color="muted">
          ¿Ya tienes cuenta?
          <Link href="/login" className={styles.loginLink}>
            Inicia sesión
          </Link>
        </Typography>
      </footer>
    </div>
  );
}
