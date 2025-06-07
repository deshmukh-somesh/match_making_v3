import { createTRPCClient, httpBatchLink, loggerLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from './root'

/**
 * tRPC Client Setup
 * 
 * This creates the client-side tRPC instance that gives us:
 * 1. Type-safe API calls from React components
 * 2. React Query integration for caching and loading states
 * 3. Request batching for performance
 * 4. Automatic error handling
 */

function getBaseUrl() {
  if (typeof window !== 'undefined')
    // browser should use relative path
    return ''

  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`

  if (process.env.RENDER_INTERNAL_HOSTNAME)
    // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`
}

/**
 * React tRPC client - use this in React components
 */
export const trpc = createTRPCReact<AppRouter>()

/**
 * Vanilla tRPC client - use this in server components or utilities
 */
export const trpcClient = createTRPCClient<AppRouter>({
  links: [
    loggerLink({
      enabled: (opts) =>
        process.env.NODE_ENV === 'development' ||
        (opts.direction === 'down' && opts.result instanceof Error),
    }),
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
      headers() {
        return {
          // Add any headers you need (auth tokens, etc.)
        }
      },
    }),
  ],
})

/**
 * Why this client setup?
 * 
 * 1. **Two Clients**: React client for components, vanilla client for server-side
 * 2. **Request Batching**: Multiple API calls are batched into single HTTP request
 * 3. **Logging**: Development-friendly request/response logging
 * 4. **Environment Aware**: Works in development, Vercel, Render, etc.
 * 5. **Type Safety**: Full TypeScript autocomplete and error checking
 */