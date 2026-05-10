'use client';

import { ChevronRight, ChevronDown } from 'lucide-react';
import type { Sticker } from '@/lib/schemas/sticker';
import { StickerSection } from '@/components/stickers/StickerSection/StickerSection';
import styles from './TeamRow.module.css';

export type { TeamRowProps } from './TeamRow.types';
import type { TeamRowProps } from './TeamRow.types';

const TOTAL_DOTS = 5;

const FOIL_GRADIENT = 'linear-gradient(135deg, #C9A84C, #F5E6A3)';

export function TeamRow({
  team,
  checkedIds,
  onToggle,
  accent,
  isExpanded,
  onToggleExpand,
}: TeamRowProps) {
  const total = team.stickers.length;
  const checkedCount = team.stickers.filter((s) => checkedIds.has(s.id)).length;
  const filledDots = total > 0 ? Math.round((checkedCount / total) * TOTAL_DOTS) : 0;

  const specialStickers = team.stickers.filter(
    (s) => s.type === 'team_logo' || s.type === 'team_photo',
  );
  const playerStickers = team.stickers.filter((s) => s.type === 'player');
  const introStickers = team.stickers.filter((s) => s.type === 'intro');

  const handleClearSection = (sectionStickers: Sticker[]) => {
    sectionStickers.forEach((s) => {
      if (checkedIds.has(s.id)) onToggle(s.id, false);
    });
  };

  const badgeGradient =
    team.code === 'intro' || team.flag_colors.length === 0
      ? FOIL_GRADIENT
      : `linear-gradient(135deg, ${team.flag_colors[0]}, ${team.flag_colors[1] ?? team.flag_colors[0]})`;

  const rowClass = [styles.row, isExpanded ? styles.rowExpanded : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rowClass}>
      <div
        className={styles.header}
        onClick={() => onToggleExpand(team.code)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggleExpand(team.code);
          }
        }}
        aria-expanded={isExpanded}
      >
        <div className={styles.flagBadge} style={{ background: badgeGradient }} />

        <div className={styles.teamInfo}>
          <p className={styles.teamName}>{team.name}</p>
          <p className={`${styles.counter}${checkedCount > 0 ? ` ${styles.counterActive}` : ''}`}>
            {checkedCount} / {total} repes
          </p>
        </div>

        <div className={styles.headerRight}>
          <div className={styles.dots}>
            {Array.from({ length: TOTAL_DOTS }).map((_, i) => (
              <span
                key={i}
                className={`${styles.dot}${i < filledDots ? ` ${styles.dotFilled}` : ''}`}
              />
            ))}
          </div>
          <span className={styles.chevron}>
            {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </span>
        </div>
      </div>

      {isExpanded && (
        <>
          <div className={styles.divider} />
          <div className={styles.content}>
            {introStickers.length > 0 && (
              <StickerSection
                title="INTRODUCCIÓN"
                stickers={introStickers}
                checkedIds={checkedIds}
                onToggle={onToggle}
                onClear={() => handleClearSection(introStickers)}
                accent={accent}
                flagColors={team.flag_colors}
              />
            )}
            {specialStickers.length > 0 && (
              <StickerSection
                title="ESPECIALES"
                stickers={specialStickers}
                checkedIds={checkedIds}
                onToggle={onToggle}
                onClear={() => handleClearSection(specialStickers)}
                accent={accent}
                flagColors={team.flag_colors}
              />
            )}
            {playerStickers.length > 0 && (
              <StickerSection
                title="MARCA TUS REPETIDOS"
                stickers={playerStickers}
                checkedIds={checkedIds}
                onToggle={onToggle}
                onClear={() => handleClearSection(playerStickers)}
                accent={accent}
                flagColors={team.flag_colors}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
