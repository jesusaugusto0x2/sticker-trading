'use client';

import { useRef, useCallback } from 'react';
import type { StickerState } from '@/lib/schemas/sticker';

export type { StickerState };
export type StateChange = { stickerId: string; state: StickerState };

export function useDebouncedToggle(
  onFlush: (changes: StateChange[]) => Promise<void>,
  delay = 800,
): (stickerId: string, state: StickerState) => void {
  const onFlushRef = useRef(onFlush);
  onFlushRef.current = onFlush;

  const pendingRef = useRef<Map<string, StickerState>>(new Map());
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(
    (stickerId: string, state: StickerState) => {
      pendingRef.current.set(stickerId, state);

      if (timerRef.current) clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        const changes: StateChange[] = Array.from(pendingRef.current.entries()).map(
          ([id, s]) => ({ stickerId: id, state: s }),
        );
        pendingRef.current.clear();
        onFlushRef.current(changes);
      }, delay);
    },
    [delay],
  );
}
