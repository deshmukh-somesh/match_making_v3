import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";

/**
 * Kinde Auth API Route Handler
 * 
 * This creates all the necessary auth endpoints:
 * - /api/auth/kinde_callback - handles OAuth callback
 * - /api/auth/login - initiates login flow
 * - /api/auth/logout - handles logout
 * - /api/auth/register - initiates registration flow
 * 
 * Kinde handles all the OAuth complexity for us - we just need this one file!
 */
export const GET = handleAuth();

/**
 * Important: This file must exist at exactly this path for Kinde to work.
 * The [kindeAuth] dynamic segment allows Kinde to handle multiple auth routes.
 */