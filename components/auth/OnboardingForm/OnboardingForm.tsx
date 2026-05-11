'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { User, Globe, MapPin, Building2, MessageCircle } from 'lucide-react';
import { onboardingInputSchema } from '@/lib/schemas/auth';
import { Badge, Button, Input, Select, Typography } from '@/components/ui';
import { PhonePrefixSelector } from '@/components/common/PhonePrefixSelector/PhonePrefixSelector';
import { InstagramIcon } from '@/assets/icons';
import venezuelaData from '@/lib/data/venezuela.json';
import styles from './OnboardingForm.module.css';
import type {
  OnboardingFormProps,
  OnboardingInput,
} from './OnboardingForm.types';

export type {
  OnboardingFormProps,
  OnboardingInput,
} from './OnboardingForm.types';

const countryOptions = [
  {
    value: venezuelaData.name,
    label: `${venezuelaData.flag} ${venezuelaData.name}`,
  },
];

export function OnboardingForm({
  onSubmit,
  isLoading,
  error,
  defaultName = '',
}: OnboardingFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<OnboardingInput>({
    resolver: zodResolver(onboardingInputSchema),
    defaultValues: {
      name: defaultName,
      phone_prefix: venezuelaData.dial_code,
    },
  });

  const selectedCountryName = watch('country_name');
  const selectedStateName = watch('state_name');

  const selectedCountry =
    venezuelaData.name === selectedCountryName ? venezuelaData : null;

  const stateOptions = (selectedCountry?.states ?? []).map((s) => ({
    value: s.name,
    label: s.name,
  }));

  const selectedState = selectedCountry?.states.find(
    (s) => s.name === selectedStateName
  );

  const cityOptions = (selectedState?.cities ?? []).map((c) => ({
    value: c.name,
    label: c.name,
  }));

  const countryRegister = register('country_name');
  const stateRegister = register('state_name');

  return (
    <div className={styles.form}>
      <Badge variant="ink" dot className={styles.badgeMargin}>
        MUNDIAL 2026 · BETA
      </Badge>

      <h1 className={styles.headline}>
        Completa tu <span className={styles.headlineAccent}>perfil</span>
      </h1>

      <Typography variant="body-sm" color="muted" className={styles.subtitle}>
        Solo verán tu WhatsApp e Instagram quienes hagan match contigo.
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.fields}>
          <Input
            label="Tu nombre"
            placeholder="Nombre"
            leftIcon={<User size={18} />}
            state={errors.name ? 'error' : 'default'}
            errorMessage={errors.name?.message}
            {...register('name')}
          />

          <Select
            label="País"
            placeholder="Selecciona un país"
            leftIcon={<Globe size={18} />}
            options={countryOptions}
            state={errors.country_name ? 'error' : 'default'}
            errorMessage={errors.country_name?.message}
            {...countryRegister}
            onChange={(e) => {
              countryRegister.onChange(e);
              const country =
                e.target.value === venezuelaData.name ? venezuelaData : null;
              setValue('country_code', country?.code.toLowerCase() ?? '');
              setValue('phone_prefix', country?.dial_code ?? '');
              setValue('state_name', '');
              setValue('city_name', '');
            }}
          />

          <Select
            label="Estado / Provincia"
            placeholder="Selecciona un estado"
            leftIcon={<MapPin size={18} />}
            options={stateOptions}
            state={errors.state_name ? 'error' : 'default'}
            errorMessage={errors.state_name?.message}
            disabled={!selectedCountryName}
            {...stateRegister}
            onChange={(e) => {
              stateRegister.onChange(e);
              setValue('city_name', '');
            }}
          />

          <Select
            label="Ciudad"
            placeholder="Selecciona una ciudad"
            leftIcon={<Building2 size={18} />}
            options={cityOptions}
            state={errors.city_name ? 'error' : 'default'}
            errorMessage={errors.city_name?.message}
            disabled={!selectedStateName}
            {...register('city_name')}
          />

          <div className={styles.phoneGroup}>
            <div className={styles.prefixWrapper}>
              <PhonePrefixSelector
                state={errors.phone_prefix ? 'error' : 'default'}
                {...register('phone_prefix')}
              />
            </div>
            <div className={styles.phoneWrapper}>
              <Input
                label="WhatsApp"
                placeholder="4141234567"
                leftIcon={<MessageCircle size={18} />}
                state={errors.phone_number ? 'error' : 'default'}
                errorMessage={errors.phone_number?.message}
                {...register('phone_number')}
              />
            </div>
          </div>

          <Input
            label="Instagram"
            placeholder="@usuario"
            leftIcon={<InstagramIcon size={18} />}
            state={errors.instagram ? 'error' : 'default'}
            errorMessage={errors.instagram?.message}
            {...register('instagram')}
          />
        </div>

        {error && (
          <Typography variant="body-sm" color="danger">
            {error}
          </Typography>
        )}

        <div className={styles.submitWrapper}>
          <Button type="submit" variant="primary" fullWidth loading={isLoading}>
            Empezar a intercambiar →
          </Button>
        </div>
      </form>

      <footer className={styles.footer}>
        <Typography variant="body-sm" color="muted">
          ¿Ya tienes cuenta?
          <Link href="/login" className={styles.loginLink}>
            Inicia sesión
          </Link>
        </Typography>
      </footer>
    </div>
  );
}
