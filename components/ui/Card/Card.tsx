import styles from './Card.module.css';
import type { CardProps, CardAccent, CardPadding, CardBorder } from './Card.types';

export type { CardProps, CardAccent, CardPadding, CardBorder } from './Card.types';

const accentClass: Record<CardAccent, string> = {
  default: styles.accentDefault,
  green:   styles.accentGreen,
  coral:   styles.accentCoral,
  yellow:  styles.accentYellow,
  purple:  styles.accentPurple,
};

const paddingClass: Record<CardPadding, string> = {
  none: styles.paddingNone,
  sm:   styles.paddingSm,
  md:   styles.paddingMd,
  lg:   styles.paddingLg,
};

const borderClass: Record<CardBorder, string> = {
  solid:  '',
  dashed: styles.borderDashed,
};

export function Card({
  accent = 'default',
  padding = 'md',
  border = 'solid',
  className,
  children,
}: CardProps) {
  const classNames = [
    styles.card,
    accentClass[accent],
    paddingClass[padding],
    borderClass[border],
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classNames}>{children}</div>;
}
