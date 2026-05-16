import { Button } from '@/components/ui/Button/Button';
import styles from './GuestBanner.module.css';

export function GuestBanner() {
  return (
    <div className={styles.banner}>
      <span className={styles.text}>
        ¿También coleccionas cromos del Mundial?
      </span>
      <Button variant="secondary" size="sm" href="/login">
        Únete gratis →
      </Button>
    </div>
  );
}
