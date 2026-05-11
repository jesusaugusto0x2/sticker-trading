import type { Sticker, StickerState } from '@/lib/schemas/sticker';

export interface StickerSectionProps {
  title: string;
  stickers: Sticker[];
  statesMap: Map<string, 'placed' | 'repeated'>;
  onStateChange: (stickerId: string, forcedState?: StickerState) => void;
  onClear: () => void;
  accent: 'green' | 'coral';
  flagColors?: string[];
}
