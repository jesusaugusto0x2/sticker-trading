import styles from './Card.module.css';
import type { CardProps, CardAccent, CardPadding } from './Card.types';

export type { CardProps, CardAccent, CardPadding } from './Card.types';

const accentClass: Record<CardAccent, string> = {
  default: styles.accentDefault,
  green: styles.accentGreen,
  coral: styles.accentCoral,
  yellow: styles.accentYellow,
  purple: styles.accentPurple,
};

const paddingClass: Record<CardPadding, string> = {
  none: styles.paddingNone,
  sm: styles.paddingSm,
  md: styles.paddingMd,
  lg: styles.paddingLg,
};

export function Card({
  accent = 'default',
  padding = 'md',
  className,
  children,
}: CardProps) {
  const classNames = [
    styles.card,
    accentClass[accent],
    paddingClass[padding],
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classNames}>{children}</div>;
}
