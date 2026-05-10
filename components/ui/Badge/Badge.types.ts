import type { ReactNode } from 'react';

export type BadgeVariant = 'default' | 'ink' | 'green' | 'yellow' | 'coral';

export interface BadgeProps {
  variant?: BadgeVariant;
  dot?: boolean;
  children: ReactNode;
  className?: string;
}
