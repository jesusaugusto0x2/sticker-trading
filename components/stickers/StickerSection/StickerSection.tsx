'use client';

import { StickerGrid } from '@/components/stickers/StickerGrid/StickerGrid';
import styles from './StickerSection.module.css';

export type { StickerSectionProps } from './StickerSection.types';
import type { StickerSectionProps } from './StickerSection.types';

export function StickerSection({
  title,
  stickers,
  checkedIds,
  onToggle,
  onClear,
  accent,
  flagColors,
}: StickerSectionProps) {
  const accentStyle = {
    '--accent-color': accent === 'coral' ? 'var(--color-coral)' : 'var(--color-green)',
  } as React.CSSProperties;

  return (
    <div className={styles.section} style={accentStyle}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        <button type="button" className={styles.clearBtn} onClick={onClear}>
          Clear
        </button>
      </div>
      <StickerGrid
        stickers={stickers}
        checkedIds={checkedIds}
        onToggle={onToggle}
        accent={accent}
        flagColors={flagColors}
      />
    </div>
  );
}
