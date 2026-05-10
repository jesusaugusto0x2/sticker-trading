import type { Sticker } from '@/lib/schemas/sticker';

export interface StickerSectionProps {
  title: string;
  stickers: Sticker[];
  checkedIds: Set<string>;
  onToggle: (stickerId: string, checked: boolean) => void;
  onClear: () => void;
  accent: 'green' | 'coral';
  flagColors?: string[];
}
