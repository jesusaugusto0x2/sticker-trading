import styles from './LoginHero.module.css';
import { Typography } from '@/components/ui';

function StickerCard({
  initials,
  number,
  name,
  team,
  gradientClass,
  positionClass,
}: {
  initials: string;
  number: string;
  name: string;
  team: string;
  gradientClass: string;
  positionClass: string;
}) {
  return (
    <div className={`${styles.card} ${positionClass}`}>
      <div className={`${styles.cardGradient} ${gradientClass}`}>
        <p className={styles.cardInitials}>{initials}</p>
      </div>
      <div className={styles.cardBody}>
        <p className={styles.cardNumber}>{number}</p>
        <p className={styles.cardName}>{name}</p>
        <p className={styles.cardTeam}>{team}</p>
      </div>
    </div>
  );
}

export function LoginHero() {
  return (
    <div className={styles.hero}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>R</div>
          <span className={styles.logoText}>repes26</span>
        </div>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          MUNDIAL 2026 · BETA
        </div>
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
            gradientClass={styles.gradientArg}
            positionClass={styles.cardOne}
          />
          <StickerCard
            initials="VJ"
            number="#87"
            name="V. Jr."
            team="Brasil"
            gradientClass={styles.gradientBra}
            positionClass={styles.cardTwo}
          />
          <StickerCard
            initials="HR"
            number="#113"
            name="H. Reyes"
            team="México"
            gradientClass={styles.gradientMex}
            positionClass={styles.cardThree}
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
