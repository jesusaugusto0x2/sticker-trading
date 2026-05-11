import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import type { StickerState } from '@/lib/schemas/sticker';

export async function GET() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('user_sticker_states')
    .select('sticker_id, state')
    .eq('user_id', user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ states: data ?? [] });
}

export async function PATCH(request: Request) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { changes } = await request.json() as {
    changes: { stickerId: string; state: StickerState }[];
  };

  if (!Array.isArray(changes) || changes.length === 0) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const toUpsert = changes
    .filter((c) => c.state !== null)
    .map((c) => ({
      user_id: user.id,
      sticker_id: c.stickerId,
      state: c.state,
      updated_at: new Date().toISOString(),
    }));

  const toDelete = changes.filter((c) => c.state === null).map((c) => c.stickerId);

  const [upsertResult, deleteResult] = await Promise.all([
    toUpsert.length > 0
      ? supabase.from('user_sticker_states').upsert(toUpsert)
      : null,
    toDelete.length > 0
      ? supabase
          .from('user_sticker_states')
          .delete()
          .eq('user_id', user.id)
          .in('sticker_id', toDelete)
      : null,
  ]);

  if (upsertResult?.error) {
    return NextResponse.json({ error: upsertResult.error.message }, { status: 500 });
  }
  if (deleteResult?.error) {
    return NextResponse.json({ error: deleteResult.error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
