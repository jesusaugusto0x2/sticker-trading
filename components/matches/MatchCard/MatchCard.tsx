'use client';

import { WhatsAppIcon } from '@/assets/icons/WhatsAppIcon';
import { InstagramIcon } from '@/assets/icons/InstagramIcon';
import styles from './MatchCard.module.css';

export type { MatchCardProps } from './MatchCard.types';
import type { MatchCardProps } from './MatchCard.types';

const HOT_THRESHOLD = 5;

const AVATAR_COLORS = ['#E8845C', '#5C9E85', '#7B8EC4', '#C4845C', '#8E6BC4'];

function getAvatarColor(nombre: string): string {
  return AVATAR_COLORS[nombre.charCodeAt(0) % AVATAR_COLORS.length];
}

function getInitials(nombre: string): string {
  const parts = nombre.trim().split(/\s+/);
  if (parts.length >= 2)
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return nombre.slice(0, 2).toUpperCase();
}

export function MatchCard({ match }: MatchCardProps) {
  const {
    nombre,
    country_name,
    city_name,
    phone_prefix,
    phone_number,
    instagram,
    has_for_me,
    i_can_give,
  } = match;

  const total = Number(has_for_me) + Number(i_can_give);
  const isHot = total >= HOT_THRESHOLD;

  const hasWhatsApp = Boolean(phone_prefix && phone_number);
  const hasInstagram = Boolean(instagram);

  const whatsAppHref = hasWhatsApp
    ? `https://wa.me/${phone_prefix!.replace('+', '')}${phone_number}`
    : undefined;

  const instagramHref = hasInstagram
    ? `https://instagram.com/${instagram!.replace('@', '')}`
    : undefined;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div
          className={styles.avatar}
          style={{ background: getAvatarColor(nombre) }}
        >
          {getInitials(nombre)}
        </div>

        <div className={styles.userInfo}>
          <div className={styles.nameRow}>
            <p className={styles.name}>{nombre}</p>
            {isHot && <span className={styles.hotBadge}>🔥 HOT</span>}
          </div>
          <p className={styles.location}>
            {country_name} · {city_name}
          </p>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <p className={styles.statLabel}>TIENE PARA TI</p>
          <p className={styles.statValue}>
            <span className={styles.statNumber}>{has_for_me}</span> cromos
          </p>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.stat}>
          <p className={styles.statLabel}>LE PUEDES DAR</p>
          <p className={styles.statValue}>
            <span className={styles.statNumber}>{i_can_give}</span> cromos
          </p>
        </div>
      </div>

      <div className={styles.actions}>
        {hasWhatsApp ? (
          <a
            href={whatsAppHref}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnWhatsApp}
          >
            <WhatsAppIcon size={18} color="white" />
            WhatsApp
          </a>
        ) : (
          <button type="button" className={styles.btnDisabled} disabled>
            <WhatsAppIcon size={18} color="white" />
            WhatsApp
          </button>
        )}

        {hasInstagram ? (
          <a
            href={instagramHref}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnInstagram}
          >
            <InstagramIcon size={18} color="white" />@{' '}
            {instagram!.replace('@', '')}
          </a>
        ) : (
          <button type="button" className={styles.btnDisabled} disabled>
            <InstagramIcon size={18} color="white" />
            Instagram
          </button>
        )}
      </div>
    </div>
  );
}
