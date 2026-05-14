import type { Match } from '@/lib/schemas/match';

export interface MatchCardProps {
  match: Match;
  isExpanded: boolean;
  onToggle: () => void;
}
