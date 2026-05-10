'use client';

import { useId } from 'react';
import styles from './Toggle.module.css';
import type { ToggleProps } from './Toggle.types';

export type { ToggleProps, ToggleVariant } from './Toggle.types';

export function Toggle({
  checked,
  onChange,
  label,
  variant = 'plain',
  disabled = false,
}: ToggleProps) {
  const id = useId();
  const isCard = variant === 'card';

  // shared input + track markup — sibling selector drives all visual state
  const track = (
    <>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className={styles.nativeInput}
        aria-checked={checked}
      />
      <span className={styles.track} aria-hidden="true">
        <span className={styles.thumb} />
      </span>
    </>
  );

  if (isCard) {
    return (
      <div
        className={[styles.card, disabled ? styles.disabled : '']
          .filter(Boolean)
          .join(' ')}
      >
        <label htmlFor={id} className={styles.wrapperInCard}>
          {track}
          {label && <span className={styles.labelText}>{label}</span>}
        </label>
      </div>
    );
  }

  return (
    <label
      htmlFor={id}
      className={[styles.wrapper, disabled ? styles.disabled : '']
        .filter(Boolean)
        .join(' ')}
    >
      {track}
      {label && <span className={styles.labelText}>{label}</span>}
    </label>
  );
}
