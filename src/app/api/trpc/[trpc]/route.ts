import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '@/lib/trpc/root'
import { createTRPCContext } from '@/lib/trpc/server'

/**
 * tRPC API Route Handler
 * 
 * This creates the /api/trpc endpoint that handles all our tRPC requests.
 * It's a single endpoint that handles all procedures based on the request body.
 */
const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: createTRPCContext,
    onError:
      process.env.NODE_ENV === 'development'
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`
            )
          }
        : undefined,
  })

export { handler as GET, handler as POST }

/**
 * Why this API route?
 * 
 * 1. **Single Endpoint**: All tRPC procedures go through /api/trpc
 * 2. **Request Batching**: Multiple procedures can be called in one request
 * 3. **Error Handling**: Development-friendly error logging
 * 4. **Context Creation**: Each request gets fresh context with user/db
 * 5. **HTTP Methods**: Supports both GET (queries) and POST (mutations)
 */