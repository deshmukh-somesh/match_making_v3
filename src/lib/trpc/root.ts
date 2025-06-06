import {router} from './server'
import {profileRouter} from './routers/profile'


/**
 * Main tRPC Router
 * 
 * This is the main router that combines all feature routers. 
 * As we add more features (matches, payments, etc), we'll add more routers here. 
 */


export const appRouter = router({
    profile: profileRouter, 
    // future routers will be added here: 
    // matches: matchesRouter, 
    // payments: paymentsRouter, 
    // interests: interestsRouter,
})

// Export type defination for the router 
export type AppRouter = typeof appRouter

/**
 * 
 */