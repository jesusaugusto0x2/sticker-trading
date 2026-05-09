import { InputHTMLAttributes } from 'react';

export type CheckboxAccent = 'green' | 'coral';
export type CheckboxVariant = 'plain' | 'card';

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size' | 'onChange'
> {
  label?: string;
  accent?: CheckboxAccent;
  variant?: CheckboxVariant;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}
