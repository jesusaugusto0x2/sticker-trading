import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { userId: targetId } = await params;

  const [myResult, theirResult] = await Promise.all([
    supabase
      .from('user_sticker_states')
      .select('sticker_id, state')
      .eq('user_id', user.id),
    supabase
      .from('user_sticker_states')
      .select('sticker_id, state')
      .eq('user_id', targetId),
  ]);

  const myMap = new Map(
    (myResult.data ?? []).map((s) => [s.sticker_id, s.state])
  );
  const theirMap = new Map(
    (theirResult.data ?? []).map((s) => [s.sticker_id, s.state])
  );

  // Stickers they can give me: they have repeated + I have no state
  const receives = (theirResult.data ?? [])
    .filter((s) => s.state === 'repeated' && !myMap.has(s.sticker_id))
    .map((s) => s.sticker_id);

  // Stickers I can give them: I have repeated + they have no state
  const gives = (myResult.data ?? [])
    .filter((s) => s.state === 'repeated' && !theirMap.has(s.sticker_id))
    .map((s) => s.sticker_id);

  return NextResponse.json({ gives, receives });
}
