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

  const [profileResult, statesResult] = await Promise.all([
    supabase
      .from('profiles')
      .select('name, country_code, country_name, state_name, city_name, phone_prefix, phone_number, instagram')
      .eq('user_id', user.id)
      .single(),
    supabase
      .from('user_sticker_states')
      .select('state')
      .eq('user_id', user.id),
  ]);

  if (profileResult.error) {
    return NextResponse.json({ error: profileResult.error.message }, { status: 500 });
  }

  const states = statesResult.data ?? [];
  const placed_count = states.filter((s) => s.state === 'placed').length;
  const repeated_count = states.filter((s) => s.state === 'repeated').length;

  return NextResponse.json({ ...profileResult.data, user_id: user.id, placed_count, repeated_count });
}

export async function PATCH(request: Request) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { phone_prefix, phone_number, instagram } = await request.json();

  const { error } = await supabase
    .from('profiles')
    .update({
      phone_prefix: phone_prefix ?? null,
      phone_number: phone_number ?? null,
      instagram: instagram ?? null,
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function PUT(request: Request) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();

  const { error } = await supabase.from('profiles').upsert({
    user_id: user.id,
    name: body.name,
    country_code: body.country_code ?? '',
    country_name: body.country_name,
    state_name: body.state_name,
    city_name: body.city_name,
    phone_prefix: body.phone_prefix ?? null,
    phone_number: body.phone_number ?? null,
    instagram: body.instagram ?? null,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
