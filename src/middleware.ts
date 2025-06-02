import { withAuth } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  return withAuth(req);
}

// Use specific route protection instead of publicPaths
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*', 
    '/settings/:path*',
    '/matches/:path*',
    '/messages/:path*',
    '/family-details/:path*'
  ],
}