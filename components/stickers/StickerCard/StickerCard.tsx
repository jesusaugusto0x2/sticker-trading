import styles from './StickerCard.module.css';

export type { StickerCardProps } from './StickerCard.types';
import type { StickerCardProps } from './StickerCard.types';

export function StickerCard({
  initials,
  number,
  name,
  team,
  countryCode,
  className,
}: StickerCardProps) {
  return (
    <div className={`${styles.card}${className ? ` ${className}` : ''}`}>
      <div
        className={styles.cardGradient}
        style={{ background: `linear-gradient(135deg, var(--flag-${countryCode}-1), var(--flag-${countryCode}-2))` }}
      >
        <p className={styles.cardInitials}>{initials}</p>
      </div>
      <div className={styles.cardBody}>
        <p className={styles.cardNumber}>{number}</p>
        <p className={styles.cardName}>{name}</p>
        <p className={styles.cardTeam}>{team}</p>
      </div>
    </div>
  );
}
