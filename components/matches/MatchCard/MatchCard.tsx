'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { WhatsAppIcon } from '@/assets/icons/WhatsAppIcon';
import { InstagramIcon } from '@/assets/icons/InstagramIcon';
import { Card, Typography } from '@/components/ui';
import styles from './MatchCard.module.css';

export type { MatchCardProps } from './MatchCard.types';
import type { MatchCardProps } from './MatchCard.types';

const HOT_THRESHOLD = 5;

const AVATAR_COLORS = ['#E8845C', '#5C9E85', '#7B8EC4', '#C4845C', '#8E6BC4'];

function getAvatarColor(name: string): string {
  return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2)
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

interface StickerLists {
  gives: string[];
  receives: string[];
}

export function MatchCard({ match }: MatchCardProps) {
  const {
    user_id,
    name,
    country_name,
    city_name,
    phone_prefix,
    phone_number,
    instagram,
    has_for_me,
    i_can_give,
  } = match;

  const [expanded, setExpanded] = useState(false);
  const [stickers, setStickers] = useState<StickerLists | null>(null);
  const [loadingStickers, setLoadingStickers] = useState(false);

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

  const handleToggle = async () => {
    const next = !expanded;
    setExpanded(next);
    if (next && !stickers && !loadingStickers) {
      setLoadingStickers(true);
      const res = await fetch(`/api/matches/${user_id}/stickers`);
      const data = await res.json();
      setStickers(data);
      setLoadingStickers(false);
    }
  };

  return (
    <Card padding="none" className={styles.inner}>
      <div className={styles.header}>
        <div
          className={styles.avatar}
          style={{ background: getAvatarColor(name) }}
        >
          {getInitials(name)}
        </div>

        <div className={styles.userInfo}>
          <div className={styles.nameRow}>
            <p className={styles.name}>{name}</p>
            {isHot && <span className={styles.hotBadge}>🔥 HOT</span>}
          </div>
          <p className={styles.location}>
            {country_name} · {city_name}
          </p>
        </div>
      </div>

      <button
        type="button"
        className={`${styles.stats} ${expanded ? styles.statsExpanded : ''}`}
        onClick={handleToggle}
        aria-expanded={expanded}
      >
        <div className={styles.statsRow}>
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
              <span className={`${styles.statNumber} ${styles.statNumberCoral}`}>{i_can_give}</span> cromos
            </p>
          </div>
          <ChevronDown
            size={16}
            className={`${styles.chevron} ${expanded ? styles.chevronOpen : ''}`}
          />
        </div>

        {expanded && (
          <div className={styles.stickerLists}>
            {loadingStickers ? (
              <Typography variant="caption" color="muted">Cargando...</Typography>
            ) : (
              <>
                <div className={styles.stickerList}>
                  <Typography variant="label" color="muted">Tienen para ti</Typography>
                  <div className={styles.chips}>
                    {stickers?.receives.map((id) => (
                      <Typography key={id} variant="caption" as="span" className={styles.chip}>
                        {id}
                      </Typography>
                    ))}
                  </div>
                </div>
                <div className={styles.stickerList}>
                  <Typography variant="label" color="muted">Puedes darles</Typography>
                  <div className={styles.chips}>
                    {stickers?.gives.map((id) => (
                      <Typography key={id} variant="caption" as="span" className={styles.chipCoral}>
                        {id}
                      </Typography>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </button>

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
    </Card>
  );
}
