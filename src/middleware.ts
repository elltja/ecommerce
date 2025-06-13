import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './server/auth';
import { canAccessSellerPages } from './permissions/seller';

const protectedRoutes = ['/seller'];

export default async function middleware(request: NextRequest) {
  const session = await auth();

  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (
    isProtected &&
    (session == null || !canAccessSellerPages({ role: session?.user.role }))
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}
