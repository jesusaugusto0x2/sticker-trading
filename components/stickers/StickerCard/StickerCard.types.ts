import type { Sticker } from '@/lib/schemas/sticker';

export interface StickerCardProps {
  sticker: Sticker;
  isChecked: boolean;
  isDisabled?: boolean;
  disabledLabel?: string;
  onToggle: (stickerId: string, checked: boolean) => void;
  accent: 'green' | 'coral';
  flagColors?: string[];
}
