'use client';

import { useState, useEffect, useMemo } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import stickersData from '@/lib/data/stickers.json';
import { extractUserId } from '@/lib/utils/slug';
import { useDebounce } from '@/hooks';
import { APP_URL, FOIL_GRADIENT, TOTAL_STICKERS } from '@/constants';
import { PublicProfileHeader } from '@/components/profile/PublicProfileHeader/PublicProfileHeader';
import { GuestBanner } from '@/components/profile/GuestBanner/GuestBanner';
import { StickerStatusRow } from '@/components/profile/StickerStatusRow/StickerStatusRow';
import { Input } from '@/components/ui/Input/Input';
import { Button } from '@/components/ui/Button/Button';
import { Typography } from '@/components/ui/Typography/Typography';
import { WhatsAppIcon } from '@/assets/icons/WhatsAppIcon';
import type { Profile } from '@/lib/schemas/user';
import type { Team } from '@/lib/schemas/sticker';
import type { StickerStatus } from '@/components/profile/StickerStatusRow/StickerStatusRow';
import styles from './PublicProfilePage.module.css';

interface PublicProfilePageProps {
  slug: string;
}

function normalizeText(text: string): string {
  return text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

export function PublicProfilePage({ slug }: PublicProfilePageProps) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [repeatedIds, setRepeatedIds] = useState<Set<string>>(new Set());
  const [placedIds, setPlacedIds] = useState<Set<string>>(new Set());
  const [viewerRepeatedIds, setViewerRepeatedIds] = useState<Set<string>>(
    new Set()
  );
  const [isGuest, setIsGuest] = useState(true);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [expandedTeams, setExpandedTeams] = useState<Set<string>>(new Set());
  const [selectedAvailable, setSelectedAvailable] = useState<Set<string>>(
    new Set()
  );
  const [selectedWanted, setSelectedWanted] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function loadData() {
      const userId = extractUserId(slug);

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (!profileData) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const [{ data: stickerStates }, { data: authData }] = await Promise.all([
        supabase
          .from('user_sticker_states')
          .select('sticker_id, state')
          .eq('user_id', profileData.user_id),
        supabase.auth.getUser(),
      ]);

      const repeated = new Set<string>(
        stickerStates
          ?.filter((s) => s.state === 'repeated')
          .map((s) => s.sticker_id) ?? []
      );
      const placed = new Set<string>(
        stickerStates?.map((s) => s.sticker_id) ?? []
      );

      setProfile(profileData as Profile);
      setRepeatedIds(repeated);
      setPlacedIds(placed);
      setIsGuest(!authData.user);
      setIsOwnProfile(authData.user?.id === profileData.user_id);

      if (authData.user && authData.user.id !== profileData.user_id) {
        const { data: viewerStates } = await supabase
          .from('user_sticker_states')
          .select('sticker_id, state')
          .eq('user_id', authData.user.id);
        setViewerRepeatedIds(
          new Set<string>(
            viewerStates
              ?.filter((s) => s.state === 'repeated')
              .map((s) => s.sticker_id) ?? []
          )
        );
      }

      setLoading(false);
    }

    loadData();
  }, [slug]);

  const getStickerStatus = (stickerId: string): StickerStatus => {
    if (repeatedIds.has(stickerId)) return 'available';
    if (!placedIds.has(stickerId)) return 'wanted';
    return 'neutral';
  };

  const allTeams: Team[] = useMemo(() => {
    const introTeam: Team = {
      code: 'intro',
      name: 'FIFA World Cup',
      flag_colors: [],
      stickers: stickersData.intro as Team['stickers'],
    };
    return [introTeam, ...(stickersData.teams as Team[])];
  }, []);

  const filteredTeams = useMemo(() => {
    const relevant = allTeams.filter((team) =>
      team.stickers.some((s) => getStickerStatus(s.id) !== 'neutral')
    );
    if (!debouncedSearch.trim()) return relevant;
    const q = normalizeText(debouncedSearch.trim());
    return relevant.filter(
      (t) =>
        normalizeText(t.name).includes(q) || t.code.toLowerCase().includes(q)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTeams, repeatedIds, placedIds, debouncedSearch]);

  const toggleTeam = (code: string) => {
    setExpandedTeams((prev) => {
      const next = new Set(prev);
      if (next.has(code)) next.delete(code);
      else next.add(code);
      return next;
    });
  };

  const toggleAvailable = (id: string) => {
    setSelectedAvailable((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleWanted = (id: string) => {
    setSelectedWanted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const generateWhatsAppMessage = (): string => {
    if (!profile) return '';

    const stickerLookup = new Map<
      string,
      { name: string; teamName: string; teamCode: string | null }
    >();
    allTeams.forEach((team) => {
      team.stickers.forEach((s) => {
        stickerLookup.set(s.id, {
          name: s.name,
          teamName: team.name,
          teamCode: team.code === 'intro' ? null : team.code,
        });
      });
    });

    const buildLines = (ids: Set<string>): string => {
      const byTeam = new Map<string, string[]>();
      for (const id of ids) {
        const info = stickerLookup.get(id);
        if (!info) continue;
        if (!byTeam.has(info.teamName)) byTeam.set(info.teamName, []);
        byTeam.get(info.teamName)!.push(`${info.name} #${id}`);
      }
      return [...byTeam.entries()]
        .map(([team, stickers]) => `- ${team}: ${stickers.join(', ')}`)
        .join('\n');
    };

    let message = `Hola ${profile.name}! Vi tu perfil para intercambiar cromos del Mundial 👋\n\n`;

    if (selectedAvailable.size > 0) {
      message += `Me interesan tus repetidas:\n${buildLines(selectedAvailable)}\n`;
    }
    if (selectedWanted.size > 0) {
      message += `\nYo tengo estas que buscas:\n${buildLines(selectedWanted)}\n`;
    }
    if (selectedAvailable.size === 0 && selectedWanted.size === 0) {
      message += `Me gustaría hacer un intercambio de cromos contigo.\n`;
    }

    message += `\n¿Hacemos el cambio?\n${APP_URL}/u/${slug}`;

    const phone =
      `${profile.phone_prefix ?? ''}${profile.phone_number ?? ''}`.replace(
        '+',
        ''
      );
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  const totalSelected = selectedAvailable.size + selectedWanted.size;
  const missingCount = TOTAL_STICKERS - placedIds.size;

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.loading}>
          <Typography variant="body-lg" color="muted">
            Cargando perfil...
          </Typography>
        </div>
      </div>
    );
  }

  if (notFound || !profile) {
    return (
      <div className={styles.page}>
        <div className={styles.notFound}>
          <Typography variant="h1">404</Typography>
          <Typography variant="body-lg" color="muted">
            No encontramos este perfil. Verifica el enlace e intenta de nuevo.
          </Typography>
          <Button variant="primary" color="green" href="/">
            Ir al inicio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {isGuest && <GuestBanner />}

      <div className={styles.page}>
        <PublicProfileHeader
          name={profile.name}
          countryCode={profile.country_code}
          countryName={profile.country_name}
          stateName={profile.state_name}
          cityName={profile.city_name}
          repeatedCount={repeatedIds.size}
          missingCount={missingCount}
          hasSelection={totalSelected > 0}
          onWhatsApp={generateWhatsAppMessage}
        />

        <Input
          type="search"
          placeholder="Buscar equipo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className={styles.teams}>
          {filteredTeams.map((team) => {
            const isExpanded = expandedTeams.has(team.code);
            const availableInTeam = team.stickers.filter((s) =>
              repeatedIds.has(s.id)
            ).length;
            const wantedInTeam = team.stickers.filter(
              (s) => !placedIds.has(s.id)
            ).length;
            const canOfferInTeam =
              !isGuest && !isOwnProfile
                ? team.stickers.filter(
                    (s) => !placedIds.has(s.id) && viewerRepeatedIds.has(s.id)
                  ).length
                : 0;

            const badgeGradient =
              team.code === 'intro' || team.flag_colors.length === 0
                ? FOIL_GRADIENT
                : `linear-gradient(135deg, ${team.flag_colors[0]}, ${team.flag_colors[1] ?? team.flag_colors[0]})`;

            return (
              <div
                key={team.code}
                className={[
                  styles.teamRow,
                  isExpanded ? styles.teamRowExpanded : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <div
                  className={styles.teamHeader}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isExpanded}
                  onClick={() => toggleTeam(team.code)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleTeam(team.code);
                    }
                  }}
                >
                  <div
                    className={styles.flagBadge}
                    style={{ background: badgeGradient }}
                  />
                  <div className={styles.teamInfo}>
                    <p className={styles.teamName}>{team.name}</p>
                    <p className={styles.teamMeta}>
                      {availableInTeam > 0 && (
                        <span className={styles.metaAvailable}>
                          {availableInTeam} disponibles
                        </span>
                      )}
                      {availableInTeam > 0 && wantedInTeam > 0 && ' · '}
                      {wantedInTeam > 0 && (
                        <span className={styles.metaWanted}>
                          {wantedInTeam} busca
                        </span>
                      )}
                      {canOfferInTeam > 0 &&
                        (availableInTeam > 0 || wantedInTeam > 0) &&
                        ' · '}
                      {canOfferInTeam > 0 && (
                        <span className={styles.metaMatch}>
                          {canOfferInTeam} puedes intercambiar
                        </span>
                      )}
                    </p>
                  </div>
                  <span className={styles.chevron}>
                    {isExpanded ? (
                      <ChevronDown size={20} />
                    ) : (
                      <ChevronRight size={20} />
                    )}
                  </span>
                </div>

                {isExpanded && (
                  <div className={styles.teamContent}>
                    <div className={styles.stickersGrid}>
                      {team.stickers.map((sticker) => {
                        const status = getStickerStatus(sticker.id);
                        return (
                          <StickerStatusRow
                            key={sticker.id}
                            stickerId={sticker.id}
                            name={sticker.name}
                            status={status}
                            flagColors={team.flag_colors}
                            canOffer={
                              !isGuest &&
                              !isOwnProfile &&
                              status === 'wanted' &&
                              viewerRepeatedIds.has(sticker.id)
                            }
                            checked={
                              status === 'available'
                                ? selectedAvailable.has(sticker.id)
                                : status === 'wanted'
                                  ? selectedWanted.has(sticker.id)
                                  : false
                            }
                            onToggle={
                              status === 'available'
                                ? toggleAvailable
                                : status === 'wanted'
                                  ? toggleWanted
                                  : undefined
                            }
                          />
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {totalSelected > 0 && <div className={styles.bottomSpacer} />}
      </div>
      {totalSelected > 0 && (
        <div className={styles.bottomSticky}>
          <span className={styles.selectionCount}>
            {totalSelected} cromos seleccionados
          </span>
          <Button
            variant="primary"
            color="green"
            leftIcon={<WhatsAppIcon size={18} color="currentColor" />}
            onClick={() =>
              window.open(
                generateWhatsAppMessage(),
                '_blank',
                'noopener,noreferrer'
              )
            }
          >
            Proponer por WhatsApp →
          </Button>
        </div>
      )}
    </div>
  );
}
