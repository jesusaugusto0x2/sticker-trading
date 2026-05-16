export type StickerStatus = 'available' | 'wanted' | 'neutral';

export interface StickerStatusRowProps {
  stickerId: string;
  name: string;
  status: StickerStatus;
  flagColors?: string[];
  checked?: boolean;
  onToggle?: (id: string) => void;
}
