import { InputHTMLAttributes, ReactNode } from 'react';

export type InputType = 'text' | 'email' | 'password' | 'search' | 'tel';
export type InputState = 'default' | 'error' | 'disabled';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  type?: InputType;
  state?: InputState;
  label?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  errorMessage?: string;
  fullWidth?: boolean;
}
