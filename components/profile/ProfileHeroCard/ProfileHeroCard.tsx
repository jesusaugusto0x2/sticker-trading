import { Card } from '@/components/ui';
import styles from './ProfileHeroCard.module.css';
export type { ProfileHeroCardProps } from './ProfileHeroCard.types';
import type { ProfileHeroCardProps } from './ProfileHeroCard.types';

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

export function ProfileHeroCard({
  name,
  countryCode,
  stateName,
  cityName,
  placedCount,
  repeatedCount,
  totalCount,
}: ProfileHeroCardProps) {
  const hasCount = placedCount + repeatedCount;
  const pct = Math.round((hasCount / totalCount) * 100);

  return (
    <Card accent="ink" padding="sm" className={styles.layout}>
      <div className={styles.top}>
        <div className={styles.avatar}>
          <span className={styles.avatarInitials}>{getInitials(name)}</span>
        </div>
        <div className={styles.identity}>
          <p className={styles.name}>{name}</p>
          <p className={styles.location}>
            {toFlagEmoji(countryCode)} {cityName}, {stateName}
          </p>
        </div>
      </div>

      <div className={styles.progress}>
        <div className={styles.progressHeader}>
          <span className={styles.progressLabel}>Progreso del álbum</span>
          <span className={styles.progressPct}>{pct}%</span>
        </div>
        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${pct}%` }} />
        </div>
        <p className={styles.progressSub}>
          {hasCount} de {totalCount} cromos
        </p>
      </div>
    </Card>
  );
}
