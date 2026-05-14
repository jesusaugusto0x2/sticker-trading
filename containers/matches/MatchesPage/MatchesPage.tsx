'use client';

import { useState, useEffect } from 'react';
import { useCurrentUser } from '@/hooks';
import { Typography } from '@/components/ui';
import { MatchCard } from '@/components/matches/MatchCard/MatchCard';
import { TradeListButton } from '@/containers/shared/TradeListButton/TradeListButton';
import type { Match } from '@/lib/schemas/match';
import styles from './MatchesPage.module.css';

export function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
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
        <div className={styles.headerTop}>
          <Typography variant="h1">Mis Matches</Typography>
          <TradeListButton />
        </div>
        <div className={styles.counter}>
          <Typography variant="display" color="green" as="span">
            {matches.length}
          </Typography>
          <Typography variant="title">personas con cromos para ti</Typography>
        </div>
      </div>

      {matches.length === 0 ? (
        <div className={styles.empty}>
          <Typography variant="title">Sin matches por ahora</Typography>
          <Typography
            variant="body-sm"
            color="muted"
            className={styles.emptySubtitle}
          >
            Marca tus cromos en el álbum para encontrar personas con quién
            intercambiar.
          </Typography>
        </div>
      ) : (
        <div className={styles.grid}>
          {matches.map((match) => (
            <div
              key={match.user_id}
              className={
                expandedId === match.user_id ? styles.cardExpanded : undefined
              }
            >
              <MatchCard
                match={match}
                isExpanded={expandedId === match.user_id}
                onToggle={() =>
                  setExpandedId(
                    expandedId === match.user_id ? null : match.user_id
                  )
                }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
