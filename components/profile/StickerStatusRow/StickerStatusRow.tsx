'use client';

import { Checkbox } from '@/components/ui/Checkbox/Checkbox';
import { Typography } from '@/components/ui/Typography/Typography';
import styles from './StickerStatusRow.module.css';

export type { StickerStatusRowProps, StickerStatus } from './StickerStatusRow.types';
import type { StickerStatusRowProps } from './StickerStatusRow.types';
import { FOIL_GRADIENT } from '@/constants';

function extractNumber(id: string): string {
  return id.match(/\d+$/)?.[0] ?? id;
}

export function StickerStatusRow({
  stickerId,
  name,
  status,
  flagColors,
  checked,
  onToggle,
}: StickerStatusRowProps) {
  const isSelectable = status !== 'neutral';

  const iconGradient =
    flagColors && flagColors.length > 0
      ? `linear-gradient(135deg, ${flagColors[0]}, ${flagColors[1] ?? flagColors[0]})`
      : FOIL_GRADIENT;

  const cardClass = [
    styles.card,
    status === 'available' ? styles.available : '',
    status === 'wanted' ? styles.wanted : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cardClass}>
      <div className={styles.icon} style={{ background: iconGradient }}>
        <Typography variant="label" color="white" as="span">
          {extractNumber(stickerId)}
        </Typography>
      </div>

      <div className={styles.content}>
        <Typography variant="body-lg" as="span" className={styles.playerName}>
          {name}
        </Typography>
        <Typography variant="caption" color="muted" as="span">
          #{stickerId}
        </Typography>
        {status === 'available' && (
          <Typography variant="caption" color="green" as="span" className={styles.statusLabel}>
            DISPONIBLE
          </Typography>
        )}
        {status === 'wanted' && (
          <Typography variant="caption" color="coral" as="span" className={styles.statusLabel}>
            LA BUSCA
          </Typography>
        )}
      </div>

      {isSelectable && (
        <Checkbox
          accent={status === 'available' ? 'green' : 'coral'}
          checked={checked ?? false}
          onChange={() => onToggle?.(stickerId)}
        />
      )}
    </div>
  );
}
