interface IconProps {
  size?: number;
  className?: string;
  color?: string;
}

export function AppleIcon({ size = 24, className, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
      <path d="M16.4 12.5c0-2.5 2-3.7 2.1-3.8-1.2-1.7-3-1.9-3.6-2-1.5-.2-3 .9-3.8.9-.8 0-2-.9-3.3-.9-1.7 0-3.3 1-4.2 2.5-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3 0 1.8-.8 3.3-.8 1.6 0 2 .8 3.3.8 1.4 0 2.3-1.2 3.2-2.5 1-1.4 1.4-2.8 1.4-2.9-.1 0-2.7-1-2.9-4.1zM14 5.4C14.7 4.5 15.2 3.3 15 2c-1.1.1-2.4.7-3.1 1.6-.7.8-1.3 2-1.1 3.2 1.2.1 2.4-.6 3.2-1.4z" />
    </svg>
  );
}
