import type { NextRequest } from 'next/server';
import { updateSession } from './lib/supabase/middleware';

export async function middleware(req: NextRequest) {
  return await updateSession(req)
}

export const config = {
  matcher: [
    '/u/:path*',
    // '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

