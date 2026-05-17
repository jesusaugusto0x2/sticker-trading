import styles from './Typography.module.css';
import type {
  TypographyProps,
  TypographyVariant,
  TypographyAs,
  TypographyWeight,
} from './Typography.types';

export type {
  TypographyProps,
  TypographyVariant,
  TypographyColor,
  TypographyWeight,
  TypographyAs,
} from './Typography.types';

const defaultTag: Record<TypographyVariant, TypographyAs> = {
  display: 'h1',
  h1: 'h1',
  h2: 'h2',
  title: 'h3',
  'body-lg': 'p',
  'body-sm': 'p',
  label: 'span',
  caption: 'span',
};

const variantClass: Record<TypographyVariant, string> = {
  display: styles.display,
  h1: styles.h1,
  h2: styles.h2,
  title: styles.title,
  'body-lg': styles.bodyLg,
  'body-sm': styles.bodySm,
  label: styles.label,
  caption: styles.caption,
};

const colorClass = {
  default: styles.colorDefault,
  muted: styles.colorMuted,
  green: styles.colorGreen,
  coral: styles.colorCoral,
  yellow: styles.colorYellow,
  danger: styles.colorDanger,
  white: styles.colorWhite,
};

const weightClass: Record<TypographyWeight, string> = {
  semibold: styles.weightSemibold,
  bold: styles.weightBold,
  extrabold: styles.weightExtrabold,
  black: styles.weightBlack,
};

export function Typography({
  variant,
  color = 'default',
  weight,
  as,
  truncate = false,
  className,
  children,
  htmlFor,
  ...rest
}: TypographyProps) {
  const Tag = (as ?? defaultTag[variant]) as React.ElementType;

  const classNames = [
    variantClass[variant],
    colorClass[color],
    weight ? weightClass[weight] : '',
    truncate ? styles.truncate : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag
      className={classNames}
      {...(htmlFor !== undefined && { htmlFor })}
      {...rest}
    >
      {children}
    </Tag>
  );
}
