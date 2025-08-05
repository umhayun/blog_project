import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const userId = request.cookies.get('user_id')?.value
  const isLoggedIn = !!userId
  const pathname = request.nextUrl.pathname
  const requiresAuth = pathname.includes('/create') || pathname.includes('/edit')
  if (requiresAuth && !isLoggedIn) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    
    return NextResponse.redirect(loginUrl)
  }
  
  if (isLoggedIn && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}