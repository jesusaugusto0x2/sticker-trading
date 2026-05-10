'use client';

import { useState, useEffect } from 'react';
import { useCurrentUser } from '@/hooks';
import { Typography } from '@/components/ui';
import { MatchCard } from '@/components/matches/MatchCard/MatchCard';
import type { Match } from '@/lib/schemas/match';
import styles from './MatchesPage.module.css';

export function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: loadingUser } = useCurrentUser();

  useEffect(() => {
    if (!user) return;

    fetch('/api/matches')
      .then((res) => res.json())
      .then(({ matches: data }) => {
        setMatches(data ?? []);
        setLoading(false);
      });
  }, [user]);

  if (loadingUser || loading) return null;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Typography variant="h1">Mis matches</Typography>
        <div className={styles.counter}>
          <span className={styles.counterNumber}>{matches.length}</span>
          <span className={styles.counterLabel}>
            personas con cromos para ti
          </span>
        </div>
      </div>

      {matches.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>Sin matches por ahora</p>
          <p className={styles.emptySubtitle}>
            Marcá tus repetidos y faltantes para encontrar personas con quién
            intercambiar.
          </p>
        </div>
      ) : (
        <div className={styles.grid}>
          {matches.map((match) => (
            <MatchCard key={match.user_id} match={match} />
          ))}
        </div>
      )}
    </div>
  );
}
