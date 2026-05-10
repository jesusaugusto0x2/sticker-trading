'use client';

import { StickerCard } from '@/components/stickers/StickerCard/StickerCard';
import styles from './StickerGrid.module.css';

export type { StickerGridProps } from './StickerGrid.types';
import type { StickerGridProps } from './StickerGrid.types';

export function StickerGrid({
  stickers,
  checkedIds,
  disabledIds,
  disabledLabel,
  onToggle,
  accent,
  flagColors,
}: StickerGridProps) {
  return (
    <div className={styles.grid}>
      {stickers.map((sticker) => (
        <StickerCard
          key={sticker.id}
          sticker={sticker}
          isChecked={checkedIds.has(sticker.id)}
          isDisabled={disabledIds.has(sticker.id)}
          disabledLabel={disabledLabel}
          onToggle={onToggle}
          accent={accent}
          flagColors={flagColors}
        />
      ))}
    </div>
  );
}
