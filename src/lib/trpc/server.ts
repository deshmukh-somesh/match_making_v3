import { initTRPC, TRPCError } from '@trpc/server'
import { db } from '@/lib/db';
import { getCurrentUserFromDB } from "@/lib/auth"
import type { UserWithProfile } from '@/types';

/**
 * 
 * This creates our type-safe API layer that: 
 * 1. Provides context (database, user) to all procedures
 * 2. Handles authentication automatically 
 * 3. Gives us full TypeScript safety from client to server
 */

// Create context for all TRPC procedures :
export async function createTRPCContext() {
    // Get the current authemticated user 
    const user = await getCurrentUserFromDB()

    return {
        db,
        user
    }
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>

// Initalize tRPC 
const t = initTRPC.context<Context>().create()

// Export reusable router and procedure helpers 
export const router = t.router
export const publicProcedure = t.procedure

/**
 * Protected procedure - requires authentication 
 * This middleware automatically checks if user is logged in . 
 * 
 */

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
    if (!ctx.user) {
        throw new TRPCError({
            code: "UNAUTHORIZED",
            message: " You must be logged in to access this resource",
        })
    }


    return next({
        ctx: {
            ...ctx,
            user: ctx.user as UserWithProfile, // Type assertion since we know user exists: 
        }
    })
})


/**
 * Why this tRPC setup?
 * 
 * 1. **Type Safety**: Full TypeScript from client to server
 * 2. **Auto Auth**: Protected procedures automatically check authentication
 * 3. **Context**: Every procedure gets database and user automatically
 * 4. **Error Handling**: Consistent error responses across API
 * 5. **Performance**: Only one request per form submission (no REST endpoints)
 */