'use client';

import styles from './LoginHero.module.css';
import { Badge, Typography } from '@/components/ui';
import { StickerCardDisplay } from '@/components/stickers/StickerCardDisplay/StickerCardDisplay';
import type { Sticker } from '@/lib/schemas/sticker';
const DEMO_STICKERS: Array<{
  sticker: Sticker;
  flagColors: string[];
  className: string;
}> = [
  {
    sticker: {
      id: '42',
      album_order: 42,
      team_code: 'arg',
      team_name: 'Argentina',
      name: 'L. Messi',
      type: 'player',
      foil: false,
    },
    flagColors: ['#74ACDF', '#FFFFFF'],
    className: styles.cardOne,
  },
  {
    sticker: {
      id: '87',
      album_order: 87,
      team_code: 'bra',
      team_name: 'Brasil',
      name: 'V. Jr.',
      type: 'player',
      foil: false,
    },
    flagColors: ['#009C3B', '#FFDF00'],
    className: styles.cardTwo,
  },
  {
    sticker: {
      id: '113',
      album_order: 113,
      team_code: 'mex',
      team_name: 'México',
      name: 'H. Reyes',
      type: 'player',
      foil: false,
    },
    flagColors: ['#006847', '#CE1126'],
    className: styles.cardThree,
  },
];

export function LoginHero() {
  return (
    <div className={styles.hero}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>R</div>
          <span className={styles.logoText}>cromos26</span>
        </div>
        <Badge variant="ink" dot>
          MUNDIAL 2026 · BETA
        </Badge>
      </header>

      <div className={styles.body}>
        <h1 className={styles.headline}>
          Cambia tus <span className={styles.headlineAccent}>cromos</span>
          {'⚽'}
        </h1>
        <Typography variant="body-lg" color="white" className={styles.subtitle}>
          Encuentra a alguien cerca con el cromo que te falta. Sin chats fríos,
          sin spam.
        </Typography>

        <div className={styles.cards}>
          {DEMO_STICKERS.map(({ sticker, flagColors, className }) => (
            <StickerCardDisplay
              key={sticker.id}
              sticker={sticker}
              state="missing"
              flagColors={flagColors}
              className={className}
            />
          ))}
        </div>
      </div>

      <footer className={styles.footer}>
        <Typography variant="caption" color="white">
          © 2026 Cromos 26 · No afiliado a Panini
        </Typography>
      </footer>
    </div>
  );
}
