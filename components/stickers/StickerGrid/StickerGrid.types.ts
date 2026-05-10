import type { Sticker } from '@/lib/schemas/sticker';

export interface StickerGridProps {
  stickers: Sticker[];
  checkedIds: Set<string>;
  disabledIds: Set<string>;
  disabledLabel?: string;
  onToggle: (stickerId: string, checked: boolean) => void;
  accent: 'green' | 'coral';
  flagColors?: string[];
}
