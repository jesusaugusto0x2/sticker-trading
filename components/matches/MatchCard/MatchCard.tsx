'use client';

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { WhatsAppIcon } from '@/assets/icons/WhatsAppIcon';
import { InstagramIcon } from '@/assets/icons/InstagramIcon';
import { Button, Card, Typography } from '@/components/ui';
import styles from './MatchCard.module.css';

export type { MatchCardProps } from './MatchCard.types';
import type { MatchCardProps } from './MatchCard.types';

const HOT_THRESHOLD = 5;
const AVATAR_COLORS = ['#E8845C', '#5C9E85', '#7B8EC4', '#C4845C', '#8E6BC4'];

function getAvatarColor(name: string): string {
  return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2)
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

function buildTradeMessage(
  name: string,
  receives: Set<string>,
  gives: Set<string>
): string {
  const firstName = name.trim().split(/\s+/)[0];
  if (receives.size > 0 && gives.size > 0) {
    return `¡Hola ${firstName}! Vi que tienes cromos que me faltan. Te propongo un intercambio:\n\n Me interesan tus cromos: ${[...receives].join(', ')}\n📤 Te puedo dar: ${[...gives].join(', ')}\n\n¿Hacemos el cambio? 🤝`;
  }
  if (receives.size > 0) {
    return `¡Hola ${firstName}! Vi que tienes los cromos ${[...receives].join(', ')} que me faltan. Yo tengo varios repetidos, ¿podemos ver si podemos hacer un intercambio? 😊`;
  }
  return `¡Hola ${firstName}! Tengo los cromos ${[...gives].join(', ')} disponibles para intercambiar. ¿Tienes algo que me falte?`;
}

interface StickerLists {
  gives: string[];
  receives: string[];
}

export function MatchCard({ match, isExpanded, onToggle }: MatchCardProps) {
  const {
    user_id,
    name,
    country_name,
    city_name,
    phone_prefix,
    phone_number,
    instagram,
    has_for_me,
    i_can_give,
  } = match;

  const [stickers, setStickers] = useState<StickerLists | null>(null);
  const [loadingStickers, setLoadingStickers] = useState(false);
  const [selectedReceives, setSelectedReceives] = useState<Set<string>>(
    new Set()
  );
  const [selectedGives, setSelectedGives] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isExpanded) {
      setSelectedReceives(new Set());
      setSelectedGives(new Set());
      setCopied(false);
    }
  }, [isExpanded]);

  const total = Number(has_for_me) + Number(i_can_give);
  const isHot = total >= HOT_THRESHOLD;
  const hasWhatsApp = Boolean(phone_prefix && phone_number);
  const hasInstagram = Boolean(instagram);
  const hasSelections = selectedReceives.size > 0 || selectedGives.size > 0;

  const tradeMessage = hasSelections
    ? buildTradeMessage(name, selectedReceives, selectedGives)
    : '';

  const whatsAppBase = hasWhatsApp
    ? `https://wa.me/${phone_prefix!.replace('+', '')}${phone_number}`
    : undefined;

  const whatsAppHref = whatsAppBase
    ? hasSelections
      ? `${whatsAppBase}?text=${encodeURIComponent(tradeMessage)}`
      : whatsAppBase
    : undefined;

  const instagramHref = hasInstagram
    ? `https://instagram.com/${instagram!.replace('@', '')}`
    : undefined;

  const handleToggle = async () => {
    onToggle();
    if (!isExpanded && !stickers && !loadingStickers) {
      setLoadingStickers(true);
      const res = await fetch(`/api/matches/${user_id}/stickers`);
      const data = await res.json();
      setStickers(data);
      setLoadingStickers(false);
    }
  };

  const toggleReceive = (id: string) => {
    setSelectedReceives((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleGive = (id: string) => {
    setSelectedGives((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const copyTradeMessage = async () => {
    await navigator.clipboard.writeText(tradeMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card padding="sm" className={styles.inner}>
      <div className={styles.header}>
        <div
          className={styles.avatar}
          style={{ background: getAvatarColor(name) }}
        >
          {getInitials(name)}
        </div>
        <div className={styles.userInfo}>
          <div className={styles.nameRow}>
            <Typography variant="title">{name}</Typography>
            {isHot && <span className={styles.hotBadge}>🔥 HOT</span>}
          </div>
          <Typography
            variant="caption"
            color="muted"
            className={styles.location}
          >
            {country_name} · {city_name}
          </Typography>
        </div>
      </div>

      <div
        className={`${styles.statsOuter} ${isExpanded ? styles.statsExpanded : ''}`}
      >
        <button
          type="button"
          className={styles.statsToggle}
          onClick={handleToggle}
          aria-expanded={isExpanded}
        >
          <div className={styles.statsRow}>
            <div className={styles.stat}>
              <Typography variant="label" color="muted">
                TIENE PARA TI
              </Typography>
              <Typography variant="body-sm">
                <span className={styles.statNumber}>{has_for_me}</span> cromos
              </Typography>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <Typography variant="label" color="muted">
                LE PUEDES DAR
              </Typography>
              <Typography variant="body-sm">
                <span
                  className={`${styles.statNumber} ${styles.statNumberCoral}`}
                >
                  {i_can_give}
                </span>{' '}
                cromos
              </Typography>
            </div>
            <ChevronDown
              size={16}
              className={`${styles.chevron} ${isExpanded ? styles.chevronOpen : ''}`}
            />
          </div>
        </button>

        {isExpanded && (
          <div className={styles.expandedContent}>
            {!loadingStickers && hasSelections && (
              <div className={styles.tradeBar}>
                <Typography variant="label">
                  {selectedReceives.size > 0 && selectedGives.size > 0
                    ? `${selectedReceives.size} cromo${selectedReceives.size !== 1 ? 's' : ''} por ${selectedGives.size}`
                    : selectedReceives.size > 0
                      ? `${selectedReceives.size} para pedir`
                      : `${selectedGives.size} para dar`}
                </Typography>
                <Button size="sm" color="green" onClick={copyTradeMessage}>
                  {copied ? '✓ Copiado' : 'Copiar mensaje'}
                </Button>
              </div>
            )}

            {loadingStickers ? (
              <div className={styles.loadingWrap}>
                <Typography variant="caption" color="muted">
                  Cargando...
                </Typography>
              </div>
            ) : (
              <div className={styles.stickerLists}>
                <div className={styles.stickerList}>
                  <Typography variant="label" color="muted">
                    Tienen para ti
                  </Typography>
                  <div className={styles.chips}>
                    {stickers?.receives.map((id) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => toggleReceive(id)}
                        className={`${styles.chip} ${selectedReceives.has(id) ? styles.chipActive : ''}`}
                      >
                        {id}
                      </button>
                    ))}
                  </div>
                </div>
                <div className={styles.stickerList}>
                  <Typography variant="label" color="muted">
                    Puedes darles
                  </Typography>
                  <div className={styles.chips}>
                    {stickers?.gives.map((id) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => toggleGive(id)}
                        className={`${styles.chipCoral} ${selectedGives.has(id) ? styles.chipCoralActive : ''}`}
                      >
                        {id}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className={styles.actions}>
        {hasWhatsApp ? (
          <a
            href={whatsAppHref}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnWhatsApp}
          >
            <WhatsAppIcon size={18} color="white" />
            WhatsApp
          </a>
        ) : (
          <button type="button" className={styles.btnDisabled} disabled>
            <WhatsAppIcon size={18} color="white" />
            WhatsApp
          </button>
        )}

        {hasInstagram ? (
          <a
            href={instagramHref}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnInstagram}
          >
            <InstagramIcon size={18} color="white" />@{' '}
            {instagram!.replace('@', '')}
          </a>
        ) : (
          <button type="button" className={styles.btnDisabled} disabled>
            <InstagramIcon size={18} color="white" />
            Instagram
          </button>
        )}
      </div>
    </Card>
  );
}
