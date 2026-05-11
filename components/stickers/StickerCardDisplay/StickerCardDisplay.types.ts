import type { Sticker } from '@/lib/schemas/sticker';

export interface StickerCardDisplayProps {
  sticker: Sticker;
  state: 'missing' | 'placed' | 'repeated';
  flagColors?: string[];
  className?: string;
}
