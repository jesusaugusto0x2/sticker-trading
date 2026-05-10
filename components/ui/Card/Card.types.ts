import { ReactNode } from 'react';

export type CardAccent = 'default' | 'green' | 'coral' | 'yellow' | 'purple';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';
export type CardBorder = 'solid' | 'dashed';

export interface CardProps {
  accent?: CardAccent;
  padding?: CardPadding;
  border?: CardBorder;
  className?: string;
  children: ReactNode;
}
