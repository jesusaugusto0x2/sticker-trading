'use client';

import { StickerCard } from '@/components/stickers/StickerCard/StickerCard';
import styles from './StickerGrid.module.css';

export type { StickerGridProps } from './StickerGrid.types';
import type { StickerGridProps } from './StickerGrid.types';

export function StickerGrid({ stickers, statesMap, onStateChange, flagColors }: StickerGridProps) {
  return (
    <div className={styles.grid}>
      {stickers.map((sticker) => (
        <StickerCard
          key={sticker.id}
          sticker={sticker}
          state={statesMap.get(sticker.id) ?? 'missing'}
          onStateChange={() => onStateChange(sticker.id)}
          flagColors={flagColors}
        />
      ))}
    </div>
  );
}
