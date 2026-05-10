import styles from './Badge.module.css';

export type { BadgeVariant, BadgeProps } from './Badge.types';
import type { BadgeProps, BadgeVariant } from './Badge.types';

const variantClasses: Record<BadgeVariant, string> = {
  default: styles.variantDefault,
  ink:     styles.variantInk,
  green:   styles.variantGreen,
  yellow:  styles.variantYellow,
  coral:   styles.variantCoral,
};

export function Badge({ variant = 'default', dot, children, className }: BadgeProps) {
  const classes = [styles.badge, variantClasses[variant], className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes}>
      {dot && <span className={styles.dot} />}
      {children}
    </span>
  );
}
