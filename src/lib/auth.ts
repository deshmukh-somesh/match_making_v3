import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "./db";
import type { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { cache } from 'react';  // ADD THIS IMPORT

/**
 * Get the current authenticated user from Kinde
 */
export async function getCurrentUser() {
  const { getUser, isAuthenticated } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    return null;
  }

  return await getUser();
}

/**
 * Sync Kinde user to our Prisma database
 * 
 * This function:
 * 1. Checks if user exists in our DB
 * 2. Creates or updates the user record
 * 3. Returns the synced user
 * 
 * We call this whenever a user logs in to ensure our DB is up-to-date
 */
export async function syncUserToDatabase(kindeUser: KindeUser<Record<string, any>>) {
  try {
    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { kindeId: kindeUser.id },
      include: { profile: true }
    });

    if (existingUser) {
      // Update existing user with latest data from Kinde
      const updatedUser = await db.user.update({
        where: { kindeId: kindeUser.id },
        data: {
          email: kindeUser.email!,
          name: `${kindeUser.given_name || ''} ${kindeUser.family_name || ''}`.trim() || null,
          avatar: kindeUser.picture || null,
        },
        include: { profile: true }
      });

      return updatedUser;
    } else {
      // Create new user
      const newUser = await db.user.create({
        data: {
          kindeId: kindeUser.id,
          email: kindeUser.email!,
          name: `${kindeUser.given_name || ''} ${kindeUser.family_name || ''}`.trim() || null,
          avatar: kindeUser.picture || null,
        },
        include: { profile: true }
      });

      return newUser;
    }
  } catch (error) {
    console.error("Error syncing user to database:", error);
    throw new Error("Failed to sync user");
  }
}

/**
 * Get the current user from our database (not Kinde)
 * This gives us access to our custom fields like profile, interests, etc.
 * 
 * CACHED VERSION - prevents duplicate database queries
 */
export const getCurrentUserFromDB = cache(async () => {  // CHANGED: cache wrapper
  const kindeUser = await getCurrentUser();

  if (!kindeUser) {
    return null;
  }

  // Sync user to our DB and return the DB record
  return await syncUserToDatabase(kindeUser);
});  // CHANGED: closing syntax

/**
 * Check if current user has completed their profile
 */
export async function isProfileComplete() {
  const user = await getCurrentUserFromDB();
  return user?.profile?.isComplete || false;
}

/**
 * Auth utilities for client components
 * These will be used in our React components
 */
export type UserWithProfile = Awaited<ReturnType<typeof getCurrentUserFromDB>>;

/**
 * Why this sync pattern?
 * 
 * 1. Kinde handles authentication (OAuth, tokens, sessions)
 * 2. Our DB stores additional user data (profiles, interests, payments)
 * 3. We sync on every login to keep data fresh
 * 4. This gives us the best of both worlds - robust auth + custom data
 * 5. CACHE prevents duplicate queries within the same request
 */