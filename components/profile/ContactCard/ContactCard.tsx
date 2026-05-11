'use client';

import { useState } from 'react';
import { MessageCircle, MapPin } from 'lucide-react';
import { Button, Card, Input, Typography } from '@/components/ui';
import { PhonePrefixSelector } from '@/components/common/PhonePrefixSelector/PhonePrefixSelector';
import { InstagramIcon } from '@/assets/icons';
import styles from './ContactCard.module.css';

export type { ContactCardProps, ContactCardSaveData } from './ContactCard.types';
import type { ContactCardProps } from './ContactCard.types';

export function ContactCard({
  phonePrefix,
  phoneNumber,
  instagram,
  cityName,
  stateName,
  onSave,
  saving,
}: ContactCardProps) {
  const [prefix, setPrefix] = useState(phonePrefix ?? '');
  const [phone, setPhone] = useState(phoneNumber ?? '');
  const [ig, setIg] = useState(instagram ?? '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave({
      phone_prefix: prefix || null,
      phone_number: phone || null,
      instagram: ig || null,
    });
  };

  return (
    <Card padding="sm">
      <div className={styles.header}>
        <Typography variant="title">Datos de contacto</Typography>
        <Typography variant="body-sm" color="muted">
          Solo los usuarios con quienes hagas match verán esta información.
        </Typography>
      </div>

      <form className={styles.fields} onSubmit={handleSubmit}>
        <div className={styles.location}>
          <MapPin size={16} className={styles.locationIcon} />
          <span className={styles.locationText}>
            {cityName}, {stateName}
          </span>
        </div>

        <div className={styles.phoneGroup}>
          <div className={styles.prefixWrapper}>
            <PhonePrefixSelector
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
            />
          </div>
          <div className={styles.phoneWrapper}>
            <Input
              label="WhatsApp"
              placeholder="4141234567"
              leftIcon={<MessageCircle size={18} />}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <Input
          label="Instagram"
          placeholder="@usuario"
          leftIcon={<InstagramIcon size={18} />}
          value={ig}
          onChange={(e) => setIg(e.target.value)}
        />

        <Button
          type="submit"
          variant="primary"
          color="green"
          fullWidth
          loading={saving}
        >
          Guardar cambios
        </Button>
      </form>
    </Card>
  );
}
