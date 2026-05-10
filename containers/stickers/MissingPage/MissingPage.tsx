'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import stickersData from '@/lib/data/stickers.json';
import { useCurrentUser, useDebounce, useDebouncedToggle } from '@/hooks';
import { Input, Typography } from '@/components/ui';
import { TeamRow } from '@/components/stickers/TeamRow/TeamRow';
import type { Team } from '@/lib/schemas/sticker';
import styles from './MissingPage.module.css';

const introTeam: Team = {
  code: 'intro',
  name: 'Introduction',
  flag_colors: [],
  stickers: stickersData.intro as Team['stickers'],
};

const allTeams = stickersData.teams as Team[];

export function MissingPage() {
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const { user, loading } = useCurrentUser();

  const debouncedSearch = useDebounce(search, 300);

  const debouncedToggle = useDebouncedToggle(async (changes) => {
    await fetch('/api/stickers/missing', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ changes }),
    });
  });

  useEffect(() => {
    if (!user) return;

    fetch('/api/stickers/missing')
      .then((res) => res.json())
      .then(({ stickerIds }) => {
        setCheckedIds(new Set(stickerIds ?? []));
      });
  }, [user]);

  const handleToggle = (stickerId: string, checked: boolean) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      checked ? next.add(stickerId) : next.delete(stickerId);
      return next;
    });
    debouncedToggle(stickerId, checked);
  };

  const handleToggleExpand = (teamCode: string) => {
    setExpandedTeam((prev) => (prev === teamCode ? null : teamCode));
  };

  const filteredTeams = allTeams.filter((team) =>
    team.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  if (loading) return null;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Typography variant="h1">Mis faltantes</Typography>
        <div className={styles.counter}>
          <span className={styles.counterNumber}>{checkedIds.size}</span>
          <span className={styles.counterLabel}>pendientes en total</span>
        </div>
        <Typography variant="body-sm" color="muted">
          Desmarca las que ya pegaste.
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
          checkedIds={checkedIds}
          onToggle={handleToggle}
          accent="coral"
          isExpanded={expandedTeam === 'intro'}
          onToggleExpand={handleToggleExpand}
          playerSectionTitle="DESMARCA LO QUE YA TIENES"
        />
        {filteredTeams.map((team) => (
          <TeamRow
            key={team.code}
            team={team}
            checkedIds={checkedIds}
            onToggle={handleToggle}
            accent="coral"
            isExpanded={expandedTeam === team.code}
            onToggleExpand={handleToggleExpand}
            playerSectionTitle="DESMARCA LO QUE YA TIENES"
          />
        ))}
      </div>
    </div>
  );
}
