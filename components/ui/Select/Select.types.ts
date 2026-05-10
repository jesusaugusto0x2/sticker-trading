import { SelectHTMLAttributes, ReactNode } from 'react';

export type SelectState = 'default' | 'error' | 'disabled';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  label?: string;
  placeholder?: string;
  state?: SelectState;
  errorMessage?: string;
  leftIcon?: ReactNode;
  fullWidth?: boolean;
}
