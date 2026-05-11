import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

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
