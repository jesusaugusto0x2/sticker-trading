'use client';

import { Checkbox } from '@/components/ui';
import styles from './StickerCard.module.css';

export type { StickerCardProps } from './StickerCard.types';
import type { StickerCardProps } from './StickerCard.types';

const FOIL_GRADIENT = 'linear-gradient(135deg, #C9A84C, #F5E6A3)';

export function StickerCard({
  sticker,
  isChecked,
  onToggle,
  accent,
  flagColors,
}: StickerCardProps) {
  const gradient =
    sticker.foil || sticker.type === 'intro'
      ? FOIL_GRADIENT
      : flagColors && flagColors.length >= 2
        ? `linear-gradient(135deg, ${flagColors[0]}, ${flagColors[1]})`
        : 'linear-gradient(135deg, var(--color-ink-25), var(--color-ink-15))';

  const badgeLabel = sticker.slot != null ? String(sticker.slot) : String(sticker.album_order);

  const handleClick = () => onToggle(sticker.id, !isChecked);

  const desktopClass = [
    styles.desktopCard,
    isChecked ? styles.desktopCardChecked : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={desktopClass} onClick={handleClick} role="button" tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(); } }}>
      <div className={styles.badge} style={{ background: gradient }}>
        {badgeLabel}
      </div>
      <div className={styles.info}>
        <p className={styles.playerName}>{sticker.name}</p>
        <p className={styles.stickerCode}>#{sticker.id}</p>
      </div>
      <Checkbox accent={accent} checked={isChecked} onChange={() => onToggle(sticker.id, !isChecked)} />
    </div>
  );
}
