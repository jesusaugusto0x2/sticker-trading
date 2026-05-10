import { useId } from 'react';

interface IconProps {
  size?: number;
  className?: string;
  color?: string;
}

export function InstagramIcon({ size = 24, className, color = 'currentColor' }: IconProps) {
  const gradientId = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FEDA75" />
          <stop offset="25%" stopColor="#FA7E1E" />
          <stop offset="60%" stopColor="#D62976" />
          <stop offset="90%" stopColor="#962FBF" />
        </linearGradient>
      </defs>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke={color} strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke={color} strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.2" fill={color} />
    </svg>
  );
}
