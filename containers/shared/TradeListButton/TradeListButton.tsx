'use client';

import { useState } from 'react';
import { Button } from '@/components/ui';
import stickersData from '@/lib/data/stickers.json';
import { toFlagEmoji, APP_URL } from '@/constants';
import { generateSlug } from '@/lib/utils/slug';

const STICKER_TO_TEAM = new Map<string, { code: string; name: string }>();
for (const team of stickersData.teams) {
  for (const sticker of team.stickers) {
    STICKER_TO_TEAM.set(sticker.id, { code: team.code, name: team.name });
  }
}

const ALL_TEAM_STICKER_IDS = stickersData.teams.flatMap((t) =>
  t.stickers.map((s) => s.id)
);

export function TradeListButton() {
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);

    const [statesRes, profileRes] = await Promise.all([
      fetch('/api/stickers/states'),
      fetch('/api/profile'),
    ]);
    const { states } = (await statesRes.json()) as {
      states: { sticker_id: string; state: string }[];
    };
    const profileData = (await profileRes.json()) as {
      name?: string;
      user_id?: string;
    };

    const placedOrRepeated = new Set(states.map((s) => s.sticker_id));
    const repeated = new Map<string, string[]>();
    const missing = new Map<string, string[]>();

    for (const { sticker_id, state } of states) {
      if (state !== 'repeated') continue;
      const team = STICKER_TO_TEAM.get(sticker_id);
      if (!team) continue;
      if (!repeated.has(team.code)) repeated.set(team.code, []);
      repeated.get(team.code)!.push(sticker_id);
    }

    for (const id of ALL_TEAM_STICKER_IDS) {
      if (placedOrRepeated.has(id)) continue;
      const team = STICKER_TO_TEAM.get(id);
      if (!team) continue;
      if (!missing.has(team.code)) missing.set(team.code, []);
      missing.get(team.code)!.push(id);
    }

    const lines: string[] = [];

    if (missing.size > 0) {
      lines.push('📋 Me faltan:');
      for (const [code, ids] of missing) {
        const nums = ids.map((id) => id.slice(code.length)).join(', ');
        lines.push(`${toFlagEmoji(code)} ${code.toUpperCase()}: ${nums}`);
      }
    }

    if (repeated.size > 0) {
      if (lines.length > 0) lines.push('');
      lines.push('🔄 Tengo repetidos:');
      for (const [code, ids] of repeated) {
        const nums = ids.map((id) => id.slice(code.length)).join(', ');
        lines.push(`${toFlagEmoji(code)} ${code.toUpperCase()}: ${nums}`);
      }
    }

    const profileUrl =
      profileData.name && profileData.user_id
        ? `${APP_URL}/u/${generateSlug(profileData.name, profileData.user_id)}`
        : APP_URL;
    lines.push('');
    lines.push('');
    lines.push(`Generado en: ${profileUrl}`);

    await navigator.clipboard.writeText(lines.join('\n'));
    setLoading(false);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant="secondary"
      size="sm"
      loading={loading}
      onClick={handleGenerate}
    >
      {copied ? '✓ Lista copiada' : 'Copiar mi lista'}
    </Button>
  );
}
