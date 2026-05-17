import { HTMLAttributes, ReactNode } from 'react';

export type TypographyVariant =
  | 'display'
  | 'h1'
  | 'h2'
  | 'title'
  | 'body-lg'
  | 'body-sm'
  | 'label'
  | 'caption';

export type TypographyColor =
  | 'default'
  | 'muted'
  | 'green'
  | 'coral'
  | 'yellow'
  | 'danger'
  | 'white';

export type TypographyWeight =
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black';

export type TypographyAs =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'label'
  | 'caption';

export interface TypographyProps extends Omit<
  HTMLAttributes<HTMLElement>,
  'color'
> {
  variant: TypographyVariant;
  color?: TypographyColor;
  weight?: TypographyWeight;
  as?: TypographyAs;
  truncate?: boolean;
  className?: string;
  children: ReactNode;
  htmlFor?: string;
}
