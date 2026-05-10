'use client';

import { useState, useId } from 'react';
import styles from './Input.module.css';
import { Typography } from '../Typography/Typography';
import type { InputProps } from './Input.types';

export type { InputProps, InputType, InputState } from './Input.types';

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
  );
}

export function Input({
  type = 'text',
  state = 'default',
  label,
  leftIcon,
  rightIcon,
  errorMessage,
  fullWidth = true,
  id,
  placeholder,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  const isDisabled = state === 'disabled';
  const resolvedType = type === 'password' && showPassword ? 'text' : type;

  const stateClass = `state${state.charAt(0).toUpperCase() + state.slice(1)}`;

  const wrapperClass = [styles.wrapper, fullWidth ? styles.fullWidth : '']
    .filter(Boolean)
    .join(' ');

  const inputWrapperClass = [styles.inputWrapper, styles[stateClass]]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClass}>
      {label && (
        <Typography variant="label" color="muted" as="label" htmlFor={inputId}>
          {label}
        </Typography>
      )}
      <div className={inputWrapperClass}>
        {type === 'search' ? (
          <span className={styles.icon}>
            <SearchIcon />
          </span>
        ) : leftIcon ? (
          <span className={styles.icon}>{leftIcon}</span>
        ) : null}

        <input
          {...props}
          id={inputId}
          type={resolvedType}
          disabled={isDisabled}
          placeholder={
            type === 'search' ? (placeholder ?? 'Buscar...') : placeholder
          }
          aria-invalid={state === 'error'}
          aria-describedby={state === 'error' && errorMessage ? errorId : undefined}
          className={styles.input}
        />

        {rightIcon && <span className={styles.icon}>{rightIcon}</span>}

        {type === 'password' && (
          <button
            type="button"
            className={styles.toggleButton}
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>

      {state === 'error' && errorMessage && (
        <Typography variant="caption" color="danger" as="p" id={errorId}>
          {errorMessage}
        </Typography>
      )}
    </div>
  );
}
