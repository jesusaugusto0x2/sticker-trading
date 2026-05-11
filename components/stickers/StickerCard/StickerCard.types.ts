import type { Sticker } from '@/lib/schemas/sticker';

export interface StickerCardProps {
  sticker: Sticker;
  state: 'missing' | 'placed' | 'repeated';
  onStateChange: () => void;
  flagColors?: string[];
}
