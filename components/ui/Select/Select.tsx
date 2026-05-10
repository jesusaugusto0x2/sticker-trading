import { forwardRef, useId } from 'react';
import { Typography } from '../Typography/Typography';
import styles from './Select.module.css';
import type { SelectProps } from './Select.types';

export type { SelectProps, SelectOption, SelectState } from './Select.types';

function ChevronDownIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    {
      options,
      label,
      placeholder,
      state = 'default',
      errorMessage,
      leftIcon,
      fullWidth = true,
      id,
      disabled,
      ...props
    },
    ref
  ) {
    const generatedId = useId();
    const selectId = id ?? generatedId;
    const errorId = `${selectId}-error`;

    const isDisabled = disabled || state === 'disabled';
    const stateClass = `state${state.charAt(0).toUpperCase() + state.slice(1)}`;

    const wrapperClass = [styles.wrapper, fullWidth ? styles.fullWidth : '']
      .filter(Boolean)
      .join(' ');

    const selectWrapperClass = [styles.selectWrapper, styles[stateClass]]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={wrapperClass}>
        {label && (
          <Typography
            variant="label"
            color="muted"
            as="label"
            htmlFor={selectId}
          >
            {label}
          </Typography>
        )}
        <div className={selectWrapperClass}>
          {leftIcon && <span className={styles.icon}>{leftIcon}</span>}

          <select
            ref={ref}
            {...props}
            id={selectId}
            disabled={isDisabled}
            aria-invalid={state === 'error'}
            aria-describedby={
              state === 'error' && errorMessage ? errorId : undefined
            }
            className={styles.select}
            defaultValue=""
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <span className={styles.chevron}>
            <ChevronDownIcon />
          </span>
        </div>

        {state === 'error' && errorMessage && (
          <Typography variant="caption" color="danger" as="p" id={errorId}>
            {errorMessage}
          </Typography>
        )}
      </div>
    );
  }
);
