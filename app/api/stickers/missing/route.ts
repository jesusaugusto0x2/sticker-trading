import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export async function GET() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('user_missing_stickers')
    .select('sticker_id')
    .eq('user_id', user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ stickerIds: data.map((r) => r.sticker_id) });
}

export async function PATCH(request: Request) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { changes } = await request.json();

  if (!Array.isArray(changes) || changes.length === 0) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const toAdd = changes
    .filter((c) => c.checked)
    .map((c) => ({
      user_id: user.id,
      sticker_id: c.stickerId,
    }));

  const toRemove = changes.filter((c) => !c.checked).map((c) => c.stickerId);

  const [addResult, removeResult] = await Promise.all([
    toAdd.length > 0
      ? supabase.from('user_missing_stickers').upsert(toAdd)
      : null,
    toRemove.length > 0
      ? supabase
          .from('user_missing_stickers')
          .delete()
          .eq('user_id', user.id)
          .in('sticker_id', toRemove)
      : null,
  ]);

  if (addResult?.error) {
    return NextResponse.json(
      { error: addResult.error.message },
      { status: 500 }
    );
  }

  if (removeResult?.error) {
    return NextResponse.json(
      { error: removeResult.error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
