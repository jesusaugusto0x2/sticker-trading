'use client';

import { useId } from 'react';
import styles from './Checkbox.module.css';
import { Typography } from '../Typography/Typography';
import type { CheckboxProps } from './Checkbox.types';

export type {
  CheckboxProps,
  CheckboxAccent,
  CheckboxVariant,
} from './Checkbox.types';

function CheckIcon() {
  return (
    <svg
      className={styles.check}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 8.5l3.5 3.5L13 4.5"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Checkbox({
  label,
  accent = 'green',
  variant = 'plain',
  checked,
  onChange,
  disabled,
  id,
  ...props
}: CheckboxProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const isDisabled = disabled;
  const isCard = variant === 'card';

  const accentClass = `accent${accent.charAt(0).toUpperCase() + accent.slice(1)}`;

  // card uses its own base class to avoid inheriting min-height from .wrapper
  const wrapperClass = isCard
    ? [styles.wrapperInCard, styles[accentClass]].filter(Boolean).join(' ')
    : [styles.wrapper, styles[accentClass], isDisabled ? styles.disabled : '']
        .filter(Boolean)
        .join(' ');

  const inner = (
    <label htmlFor={inputId} className={wrapperClass}>
      <input
        {...props}
        id={inputId}
        type="checkbox"
        checked={checked}
        disabled={isDisabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className={styles.nativeInput}
      />
      <span className={styles.box} aria-hidden="true">
        <CheckIcon />
      </span>
      {label && (
        <Typography variant="body-lg" as="span">
          {label}
        </Typography>
      )}
    </label>
  );

  if (!isCard) return inner;

  return (
    <div
      className={[styles.card, isDisabled ? styles.disabled : '']
        .filter(Boolean)
        .join(' ')}
    >
      {inner}
    </div>
  );
}
