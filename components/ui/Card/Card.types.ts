import { ReactNode } from 'react';

export type CardAccent = 'default' | 'green' | 'coral' | 'yellow' | 'purple';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps {
  accent?: CardAccent;
  padding?: CardPadding;
  className?: string;
  children: ReactNode;
}
