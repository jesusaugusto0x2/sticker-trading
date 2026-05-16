'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Sparkles, User, Link2, Check } from 'lucide-react';
import styles from './Sidebar.module.css';

interface SidebarProps {
  userName: string;
  userCity: string;
  userSlug?: string;
}

const NAV_ITEMS = [
  { href: '/stickers', label: 'Mi álbum', icon: BookOpen },
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

export function Sidebar({ userName, userCity, userSlug }: SidebarProps) {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!userSlug) return;
    navigator.clipboard.writeText(`${window.location.origin}/u/${userSlug}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>R</div>
        <span className={styles.logoText}>cromos26</span>
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
        Estás probando v0.4. Reporta bugs en @cromos26
      </div>

      <div className={styles.userRow}>
        <div className={styles.avatar}>{getAvatarInitials(userName)}</div>
        <div className={styles.userInfo}>
          <p className={styles.userName}>{userName || 'Usuario'}</p>
          <p className={styles.userCity}>{userCity}</p>
        </div>
        {userSlug && (
          <button
            className={styles.shareButton}
            onClick={handleCopy}
            title={copied ? '¡Copiado!' : 'Compartir mi perfil'}
          >
            {copied ? (
              <Check size={16} color="var(--color-green)" />
            ) : (
              <Link2 size={16} />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
