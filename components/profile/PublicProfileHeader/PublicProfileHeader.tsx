'use client';

import { Card } from '@/components/ui/Card/Card';
import { Badge } from '@/components/ui/Badge/Badge';
import { Button } from '@/components/ui/Button/Button';
import { WhatsAppIcon } from '@/assets/icons/WhatsAppIcon';
import styles from './PublicProfileHeader.module.css';

export type { PublicProfileHeaderProps } from './PublicProfileHeader.types';
import type { PublicProfileHeaderProps } from './PublicProfileHeader.types';

function toFlagEmoji(code: string): string {
  if (!code || code.length < 2) return '🌍';
  return [...code.slice(0, 2).toUpperCase()]
    .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
    .join('');
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function PublicProfileHeader({
  name,
  countryCode,
  countryName,
  stateName,
  cityName,
  repeatedCount,
  missingCount,
  hasSelection,
  onWhatsApp,
}: PublicProfileHeaderProps) {
  const handleWhatsApp = () => {
    window.open(onWhatsApp(), '_blank', 'noopener,noreferrer');
  };

  return (
    <Card accent="ink" padding="sm" className={styles.layout}>
      <div className={styles.top}>
        <div className={styles.avatar}>
          <span className={styles.avatarInitials}>{getInitials(name)}</span>
        </div>
        <div className={styles.identity}>
          <p className={styles.name}>{name}</p>
          <p className={styles.location}>
            {toFlagEmoji(countryCode)} {cityName}, {stateName}, {countryName}
          </p>
        </div>
      </div>

      <div className={styles.pills}>
        <Badge variant="green" dot>
          {repeatedCount} REPETIDAS
        </Badge>
        <Badge variant="coral" dot>
          {missingCount} BUSCADAS
        </Badge>
      </div>

      <Button
        variant="primary"
        color="green"
        fullWidth
        leftIcon={<WhatsAppIcon size={18} color="currentColor" />}
        onClick={handleWhatsApp}
      >
        {hasSelection ? 'Proponer intercambio por WhatsApp →' : 'Contactar por WhatsApp →'}
      </Button>
    </Card>
  );
}
