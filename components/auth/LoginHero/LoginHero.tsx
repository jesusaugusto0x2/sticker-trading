import styles from './LoginHero.module.css';
import { Badge, Typography } from '@/components/ui';
import { StickerCard } from '@/components/stickers';

export function LoginHero() {
  return (
    <div className={styles.hero}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>R</div>
          <span className={styles.logoText}>repes26</span>
        </div>
        <Badge variant="ink" dot>MUNDIAL 2026 · BETA</Badge>
      </header>

      <div className={styles.body}>
        <h1 className={styles.headline}>
          Cambia tus <span className={styles.headlineAccent}>repes</span>
          {'⚽'}
        </h1>
        <Typography variant="body-lg" color="white" className={styles.subtitle}>
          Encuentra a alguien cerca con el cromo que te falta. Sin chats fríos,
          sin spam.
        </Typography>

        <div className={styles.cards}>
          <StickerCard
            initials="LM"
            number="#42"
            name="L. Messi"
            team="Argentina"
            countryCode="arg"
            className={styles.cardOne}
          />
          <StickerCard
            initials="VJ"
            number="#87"
            name="V. Jr."
            team="Brasil"
            countryCode="bra"
            className={styles.cardTwo}
          />
          <StickerCard
            initials="HR"
            number="#113"
            name="H. Reyes"
            team="México"
            countryCode="mex"
            className={styles.cardThree}
          />
        </div>
      </div>

      <footer className={styles.footer}>
        <Typography variant="caption" color="white">
          © 2026 Repes 26 · No afiliado a Panini
        </Typography>
      </footer>
    </div>
  );
}
