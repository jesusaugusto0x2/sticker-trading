'use client';

import { useRef, useCallback } from 'react';

export type ToggleChange = { stickerId: string; checked: boolean };

export function useDebouncedToggle(
  onFlush: (changes: ToggleChange[]) => Promise<void>,
  delay = 800,
): (stickerId: string, checked: boolean) => void {
  const onFlushRef = useRef(onFlush);
  onFlushRef.current = onFlush;

  const pendingRef = useRef<Map<string, boolean>>(new Map());
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(
    (stickerId: string, checked: boolean) => {
      pendingRef.current.set(stickerId, checked);

      if (timerRef.current) clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        const changes: ToggleChange[] = Array.from(pendingRef.current.entries()).map(
          ([id, c]) => ({ stickerId: id, checked: c }),
        );
        pendingRef.current.clear();
        onFlushRef.current(changes);
      }, delay);
    },
    [delay],
  );
}
