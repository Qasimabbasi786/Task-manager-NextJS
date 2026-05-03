import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // 1. Define karo kon se pages public hain aur kon se protected
  const isPublicPath = path === '/login' || path === '/signup'

  // 2. Browser ki cookie se token nikalo
  const token = request.cookies.get('token')?.value || ''

  // 3. Agar public path hai aur token majood hai (user logged in hai), to redirect to home/dashboard
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  // 4. Agar protected path hai aur token nahi hai, to login par bhej do
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
}

// Ye batata hai ke middleware kin paths par apply hoga
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/tasks/:path*', // Tasks ke saare routes protect ho jayenge
  ]
}