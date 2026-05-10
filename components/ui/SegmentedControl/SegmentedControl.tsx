import styles from './SegmentedControl.module.css';
import type { SegmentedControlProps } from './SegmentedControl.types';

export type {
  SegmentedControlProps,
  SegmentedControlOption,
} from './SegmentedControl.types';

export function SegmentedControl({
  options,
  value,
  onChange,
  disabled = false,
}: SegmentedControlProps) {
  return (
    <div
      role="tablist"
      className={[styles.container, disabled ? styles.disabled : '']
        .filter(Boolean)
        .join(' ')}
    >
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.value}
            role="tab"
            type="button"
            aria-selected={isActive}
            disabled={disabled}
            onClick={() => onChange(option.value)}
            className={[
              styles.option,
              isActive ? styles.active : styles.inactive,
            ].join(' ')}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
