'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink, loggerLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'
import { useState } from 'react'
import type { AppRouter } from '@/lib/trpc/root'

/**
 * tRPC Provider Component
 * 
 * This wraps our app with tRPC and React Query providers.
 * It enables type-safe API calls with caching, loading states, and error handling.
 */

const trpc = createTRPCReact<AppRouter>()

function getBaseUrl() {
  if (typeof window !== 'undefined') return ''
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000, // 1 minute
            retry: 2,
          },
        },
      })
  )

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          // Add auth headers if needed
          headers() {
            return {}
          },
        }),
      ],
    })
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  )
}

// Export the trpc instance for use in components
export { trpc }

/**
 * Why this provider setup?
 * 
 * 1. **Client State**: Creates stable client instances that don't recreate on re-renders
 * 2. **Caching Strategy**: 1-minute stale time reduces unnecessary refetches
 * 3. **Error Handling**: Automatic retry on failed requests
 * 4. **Development UX**: Request logging in development mode
 * 5. **SSR Ready**: Works with Next.js server-side rendering
 */