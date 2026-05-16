import styles from './StickerCardDisplay.module.css';
export type { StickerCardDisplayProps } from './StickerCardDisplay.types';
import type { StickerCardDisplayProps } from './StickerCardDisplay.types';
import { FOIL_GRADIENT, STATE_LABELS } from '@/constants';

export function StickerCardDisplay({
  sticker,
  state,
  flagColors,
  className,
}: StickerCardDisplayProps) {
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
    className ?? '',
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
    <div className={cardClass}>
      <div className={styles.badge} style={{ background: gradient }}>
        {badgeLabel}
      </div>
      <div className={styles.footer}>
        <p className={styles.name}>{sticker.name}</p>
        <span className={labelClass}>{STATE_LABELS[state]}</span>
      </div>
    </div>
  );
}
