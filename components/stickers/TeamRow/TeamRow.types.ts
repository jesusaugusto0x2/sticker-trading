import type { Team } from '@/lib/schemas/sticker';

export interface TeamRowProps {
  team: Team;
  checkedIds: Set<string>;
  onToggle: (stickerId: string, checked: boolean) => void;
  accent: 'green' | 'coral';
  isExpanded: boolean;
  onToggleExpand: (teamCode: string) => void;
  playerSectionTitle?: string;
}
