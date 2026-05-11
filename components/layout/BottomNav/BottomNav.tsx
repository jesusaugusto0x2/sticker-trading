'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Sparkles, User } from 'lucide-react';
import styles from './BottomNav.module.css';

const NAV_ITEMS = [
  { href: '/stickers', label: 'Álbum', icon: BookOpen },
  { href: '/matches', label: 'Matches', icon: Sparkles },
  { href: '/perfil', label: 'Perfil', icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const isActive = pathname.startsWith(href);
        return (
          <Link key={href} href={href} className={styles.tab}>
            <div
              className={`${styles.iconWrapper}${isActive ? ` ${styles.iconWrapperActive}` : ''}`}
            >
              <Icon
                size={18}
                color={isActive ? 'var(--color-white)' : 'var(--color-ink-40)'}
              />
            </div>
            <span
              className={`${styles.label}${isActive ? ` ${styles.labelActive}` : ''}`}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
