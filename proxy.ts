import { NextResponse, type NextRequest } from 'next/server';
import { createSupabaseMiddlewareClient } from '@/lib/supabase-server';

const PUBLIC_PATHS = ['/login', '/register', '/check-email', '/auth/callback'];

export async function proxy(request: NextRequest) {
  const response = NextResponse.next({ request });
  const supabase = createSupabaseMiddlewareClient(request, response);

  const { data: { user } } = await supabase.auth.getUser();
  const { pathname } = request.nextUrl;

  const isPublic = PUBLIC_PATHS.some((p) => pathname.startsWith(p));

  if (!user) {
    if (!isPublic && pathname !== '/onboarding') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return response;
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('nombre')
    .eq('user_id', user.id)
    .single();

  const profileComplete = !!profile?.nombre;

  if (!profileComplete && pathname !== '/onboarding') {
    return NextResponse.redirect(new URL('/onboarding', request.url));
  }

  if (profileComplete && pathname === '/onboarding') {
    return NextResponse.redirect(new URL('/repes', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
