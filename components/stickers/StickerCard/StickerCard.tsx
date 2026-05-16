'use client';

import styles from './StickerCard.module.css';

export type { StickerCardProps } from './StickerCard.types';
import type { StickerCardProps } from './StickerCard.types';
import { FOIL_GRADIENT, STATE_LABELS } from '@/constants';

export function StickerCard({ sticker, state, onStateChange, flagColors }: StickerCardProps) {
  const gradient =
    sticker.foil || sticker.type === 'intro'
      ? FOIL_GRADIENT
      : flagColors && flagColors.length >= 2
        ? `linear-gradient(135deg, ${flagColors[0]}, ${flagColors[1]})`
        : 'linear-gradient(135deg, var(--color-ink-25), var(--color-ink-15))';

  const badgeLabel =
    sticker.slot != null ? String(sticker.slot) : String(sticker.album_order);

  const cardClass = [
    styles.card,
    state === 'missing' ? styles.cardMissing : '',
    state === 'repeated' ? styles.cardRepeated : '',
  ]
    .filter(Boolean)
    .join(' ');

  const labelClass = [
    styles.stateLabel,
    state === 'missing' ? styles.stateLabelMissing : '',
    state === 'repeated' ? styles.stateLabelRepeated : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={cardClass}
      onClick={onStateChange}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onStateChange();
        }
      }}
    >
      <div className={styles.badge} style={{ background: gradient }}>
        {badgeLabel}
      </div>
      <div className={styles.info}>
        <p className={styles.playerName}>{sticker.name}</p>
        <p className={styles.stickerCode}>#{sticker.id}</p>
      </div>
      <span className={labelClass}>{STATE_LABELS[state]}</span>
    </div>
  );
}
