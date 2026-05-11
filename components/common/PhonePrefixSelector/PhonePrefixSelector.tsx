import { forwardRef } from 'react';
import { Select } from '@/components/ui';
import venezuelaData from '@/lib/data/venezuela.json';
export type { PhonePrefixSelectorProps } from './PhonePrefixSelector.types';
import type { PhonePrefixSelectorProps } from './PhonePrefixSelector.types';

const options = [
  {
    value: venezuelaData.dial_code,
    label: `${venezuelaData.flag} ${venezuelaData.dial_code}`,
  },
];

export const PhonePrefixSelector = forwardRef<
  HTMLSelectElement,
  PhonePrefixSelectorProps
>(function PhonePrefixSelector({ label = 'Prefijo telf.', ...props }, ref) {
  return <Select ref={ref} label={label} options={options} {...props} />;
});
