import stickersData from '@/lib/data/stickers.json';

export const FOIL_GRADIENT = 'linear-gradient(135deg, #C9A84C, #F5E6A3)';

export const STATE_LABELS: Record<'missing' | 'placed' | 'repeated', string> = {
  missing: 'FALTANTE',
  placed: 'COLOCADO',
  repeated: 'REPETIDO',
};

export const TOTAL_STICKERS: number =
  stickersData.intro.length +
  (stickersData.teams as { stickers: unknown[] }[]).reduce(
    (acc, t) => acc + t.stickers.length,
    0
  );
