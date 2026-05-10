export type ToggleVariant = 'plain' | 'card';

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  variant?: ToggleVariant;
  disabled?: boolean;
}
