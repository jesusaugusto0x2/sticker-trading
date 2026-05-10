'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, Heart, Sparkles, User } from 'lucide-react';
import styles from './Sidebar.module.css';

interface SidebarProps {
  userName: string;
  userCity: string;
}

const NAV_ITEMS = [
  { href: '/repes', label: 'Mis repes', icon: LayoutGrid },
  { href: '/missing', label: 'Faltantes', icon: Heart },
  { href: '/matches', label: 'Matches', icon: Sparkles },
  { href: '/perfil', label: 'Perfil', icon: User },
];

function getAvatarInitials(name: string): string {
  if (!name.trim()) return 'U';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export function Sidebar({ userName, userCity }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>R</div>
        <span className={styles.logoText}>repes26</span>
      </div>

      <p className={styles.sectionLabel}>MI ÁLBUM</p>

      <nav className={styles.nav}>
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`${styles.navItem}${isActive ? ` ${styles.navItemActive}` : ''}`}
            >
              <div className={styles.navIconWrapper}>
                <Icon size={20} />
                {isActive && <span className={styles.activeIndicator} />}
              </div>
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className={styles.betaBanner}>
        Estás probando v0.4. Reporta bugs en @repes26
      </div>

      <div className={styles.userRow}>
        <div className={styles.avatar}>{getAvatarInitials(userName)}</div>
        <div className={styles.userInfo}>
          <p className={styles.userName}>{userName || 'Usuario'}</p>
          <p className={styles.userCity}>{userCity}</p>
        </div>
      </div>
    </div>
  );
}
