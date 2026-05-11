import type { Team, StickerState } from '@/lib/schemas/sticker';

export interface TeamRowProps {
  team: Team;
  statesMap: Map<string, 'placed' | 'repeated'>;
  onStateChange: (stickerId: string, forcedState?: StickerState) => void;
  accent: 'green' | 'coral';
  isExpanded: boolean;
  onToggleExpand: (teamCode: string) => void;
  playerSectionTitle?: string;
}
