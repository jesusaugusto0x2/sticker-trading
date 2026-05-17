'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import stickersData from '@/lib/data/stickers.json';
import { useCurrentUser, useDebounce, useDebouncedToggle } from '@/hooks';
import type { StickerState } from '@/lib/schemas/sticker';
import { Input, Typography } from '@/components/ui';
import { TeamRow } from '@/components/stickers/TeamRow/TeamRow';
import { TradeListButton } from '@/containers/shared/TradeListButton/TradeListButton';
import type { Team } from '@/lib/schemas/sticker';
import styles from './StickersPage.module.css';

const introTeam: Team = {
  code: 'intro',
  name: 'FIFA World Cup',
  flag_colors: [],
  stickers: stickersData.intro as Team['stickers'],
};

const allTeams = stickersData.teams as Team[];

const totalStickerCount =
  introTeam.stickers.length +
  allTeams.reduce((acc, t) => acc + t.stickers.length, 0);

const cycleState = (current: StickerState): StickerState => {
  if (current === null) return 'placed';
  if (current === 'placed') return 'repeated';
  return null;
};

export function StickersPage() {
  const [statesMap, setStatesMap] = useState<
    Map<string, 'placed' | 'repeated'>
  >(new Map());
  const [loading, setLoading] = useState(true);
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const { user, loading: loadingUser } = useCurrentUser();

  const debouncedSearch = useDebounce(search, 300);

  const debouncedToggle = useDebouncedToggle(async (changes) => {
    await fetch('/api/stickers/states', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ changes }),
    });
  });

  useEffect(() => {
    if (!user) return;
    fetch('/api/stickers/states')
      .then((r) => r.json())
      .then(({ states }) => {
        const map = new Map<string, 'placed' | 'repeated'>();
        (states ?? []).forEach(
          ({
            sticker_id,
            state,
          }: {
            sticker_id: string;
            state: 'placed' | 'repeated';
          }) => {
            map.set(sticker_id, state);
          }
        );
        setStatesMap(map);
        setLoading(false);
      });
  }, [user]);

  const handleStateChange = (stickerId: string, forcedState?: StickerState) => {
    const current = statesMap.get(stickerId) ?? null;
    const newState =
      forcedState !== undefined ? forcedState : cycleState(current);

    setStatesMap((prev) => {
      const next = new Map(prev);
      if (newState === null) next.delete(stickerId);
      else next.set(stickerId, newState);
      return next;
    });

    debouncedToggle(stickerId, newState);
  };

  const handleToggleExpand = (teamCode: string) => {
    setExpandedTeam((prev) => (prev === teamCode ? null : teamCode));
  };

  const q = debouncedSearch.toLowerCase();
  const filteredTeams = allTeams.filter((team) =>
    team.name.toLowerCase().includes(q) || team.code.toLowerCase().includes(q)
  );

  if (loadingUser || loading) return null;

  const repeatedCount = [...statesMap.values()].filter(
    (v) => v === 'repeated'
  ).length;
  const collectedCount = statesMap.size;
  const missingCount = totalStickerCount - collectedCount;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <Typography variant="h1">Mi Álbum</Typography>
          <TradeListButton />
        </div>
        <div className={styles.counter}>
          <div className={styles.stat}>
            <Typography variant="display" color="coral" as="span">{missingCount}</Typography>
            <Typography variant="title" as="span">faltantes</Typography>
          </div>
          <Typography variant="title" color="muted" as="span" className={styles.dot}>·</Typography>
          <div className={styles.stat}>
            <Typography variant="display" as="span">{collectedCount}</Typography>
            <Typography variant="title" as="span">pegados</Typography>
          </div>
          <Typography variant="title" color="muted" as="span" className={styles.dot}>·</Typography>
          <div className={styles.stat}>
            <Typography variant="display" color="green" as="span">{repeatedCount}</Typography>
            <Typography variant="title" as="span">repetidos</Typography>
          </div>
        </div>
        <Typography variant="body-sm" color="muted">
          Click una vez para colocar, dos veces para marcar como repetido.
        </Typography>
      </div>

      <div className={styles.searchWrapper}>
        <Input
          type="search"
          placeholder="Buscar país..."
          leftIcon={<Search size={18} />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
        />
      </div>

      <div className={styles.teamGrid}>
        <TeamRow
          team={introTeam}
          statesMap={statesMap}
          onStateChange={handleStateChange}
          accent="green"
          isExpanded={expandedTeam === 'intro'}
          onToggleExpand={handleToggleExpand}
        />
        {filteredTeams.map((team) => (
          <TeamRow
            key={team.code}
            team={team}
            statesMap={statesMap}
            onStateChange={handleStateChange}
            accent="green"
            isExpanded={expandedTeam === team.code}
            onToggleExpand={handleToggleExpand}
          />
        ))}
      </div>
    </div>
  );
}
