import Link from 'next/link';
import styles from './Button.module.css';
import type { ButtonProps } from './Button.types';

export type {
  ButtonProps,
  ButtonVariant,
  ButtonColor,
  ButtonSize,
} from './Button.types';

export function Button({
  variant = 'primary',
  color = 'default',
  size = 'md',
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  className,
  href,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const colorClass = `color${color.charAt(0).toUpperCase() + color.slice(1)}`;

  const classNames = [
    styles.button,
    styles[variant],
    styles[colorClass],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    isDisabled ? styles.disabled : '',
    href ? styles.link : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  const iconOnly = variant === 'icon-only';

  const content = loading ? (
    <span className={styles.spinner} aria-hidden="true" />
  ) : iconOnly ? (
    children
  ) : (
    <>
      {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
      {children}
      {rightIcon && <span className={styles.icon}>{rightIcon}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classNames}>
        {content}
      </Link>
    );
  }

  return (
    <button
      {...props}
      disabled={isDisabled}
      aria-busy={loading}
      aria-label={iconOnly ? props['aria-label'] : undefined}
      className={classNames}
    >
      {content}
    </button>
  );
}
