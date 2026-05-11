import type { Sticker, StickerState } from '@/lib/schemas/sticker';

export interface StickerGridProps {
  stickers: Sticker[];
  statesMap: Map<string, 'placed' | 'repeated'>;
  onStateChange: (stickerId: string, forcedState?: StickerState) => void;
  accent: 'green' | 'coral';
  flagColors?: string[];
}
