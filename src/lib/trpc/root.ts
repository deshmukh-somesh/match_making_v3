import { router } from './server'
import { profileRouter } from './routers/profile'

/**
 * Main tRPC Router
 * 
 * This is the main router that combines all feature routers.
 * As we add more features (matches, payments, etc.), we'll add more routers here.
 */
export const appRouter = router({
  profile: profileRouter,
  // Future routers will be added here:
  // matches: matchesRouter,
  // payments: paymentsRouter,
  // interests: interestsRouter,
})

// Export type definition for the router
export type AppRouter = typeof appRouter

/**
 * Why this structure?
 * 
 * 1. **Modular**: Each feature has its own router
 * 2. **Scalable**: Easy to add new routers as we build more features
 * 3. **Type Safety**: AppRouter type is used by the client for full TypeScript support
 * 4. **Organization**: Clear separation of concerns
 */