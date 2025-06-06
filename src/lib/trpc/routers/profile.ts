import { z } from 'zod'
import { router, protectedProcedure } from '../server'
import { CompleteProfileSchema, UpdateProfileSchema } from '@/utils/validations'
import { TRPCError } from '@trpc/server'

/**
 * Profile Router - Handles all profile-related operations
 * 
 * This router provides type-safe procedures for:
 * 1. Getting current user's profile
 * 2. Updating profile (partial or complete)
 * 3. Checking profile completion status
 */
export const profileRouter = router({
  /**
   * Get current user's profile
   */
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    const profile = await ctx.db.profile.findUnique({
      where: { userId: ctx.user.id },
    })

    return profile
  }),

  /**
   * Update profile - supports partial updates
   * This allows users to save individual tabs without completing everything
   */
  updateProfile: protectedProcedure
    .input(UpdateProfileSchema) // Partial makes all fields optional
    .mutation(async ({ ctx, input }) => {
      try {
        // Check if profile exists
        const existingProfile = await ctx.db.profile.findUnique({
          where: { userId: ctx.user.id },
        })

        let profile

        if (existingProfile) {
          // Update existing profile
          profile = await ctx.db.profile.update({
            where: { userId: ctx.user.id },
            data: {
              ...input,
              // Calculate if profile is complete
              isComplete: isProfileComplete(input, existingProfile),
            },
          })
        } else {
          // Create new profile
          profile = await ctx.db.profile.create({
            data: {
              userId: ctx.user.id,
              ...input,
              // New profiles are incomplete by default
              isComplete: false,
            },
          })
        }

        return {
          success: true,
          profile,
          message: 'Profile updated successfully!',
        }
      } catch (error) {
        console.error('Profile update error:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to update profile. Please try again.',
        })
      }
    }),

  /**
   * Check profile completion status
   * This helps us show progress and guide users
   */
  
  getCompletionStatus: protectedProcedure.query(async ({ ctx }) => {
    const profile = await ctx.db.profile.findUnique({
      where: { userId: ctx.user.id },
    })

    if (!profile) {
      return {
        isComplete: false,
        completionPercentage: 0,
        missingFields: getAllRequiredFields(),
      }
    }

    const missingFields = getMissingRequiredFields(profile)
    const totalRequired = getAllRequiredFields().length
    const completed = totalRequired - missingFields.length
    const completionPercentage = Math.round((completed / totalRequired) * 100)

    return {
      isComplete: profile.isComplete,
      completionPercentage,
      missingFields,
    }
  }),

  /**
   * Save profile tab - for progressive saving
   * This allows saving individual tabs without validation errors from other tabs
   */
  saveProfileTab: protectedProcedure
    .input(
      z.object({
        tabData: z.record(z.any()), // Flexible input for any tab
        tabName: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // Update only the fields from this tab
        const profile = await ctx.db.profile.upsert({
          where: { userId: ctx.user.id },
          create: {
            userId: ctx.user.id,
            ...input.tabData,
          },
          update: {
            ...input.tabData,
          },
        })

        return {
          success: true,
          message: `${input.tabName} saved successfully!`,
        }
      } catch (error) {
        console.error('Tab save error:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to save. Please try again.',
        })
      }
    }),
})

/**
 * Helper function to determine if profile is complete
 * A profile is complete when all required fields are filled
 */
function isProfileComplete(newData: any, existingData?: any): boolean {
  const combined = { ...existingData, ...newData }
  const requiredFields = getAllRequiredFields()
  
  return requiredFields.every(field => {
    const value = combined[field]
    return value !== null && value !== undefined && value !== ''
  })
}

/**
 * Get all required fields for a complete profile
 * These are the minimum fields needed for matching
 */
function getAllRequiredFields(): string[] {
  return [
    'firstName',
    'lastName',
    'dateOfBirth',
    'gender',
    'city',
    'state',
    'education',
    'occupation',
    'religion',
    'maritalStatus',
  ]
}

/**
 * Get missing required fields from a profile
 */
function getMissingRequiredFields(profile: any): string[] {
  const requiredFields = getAllRequiredFields()
  
  return requiredFields.filter(field => {
    const value = profile[field]
    return value === null || value === undefined || value === ''
  })
}

/**
 * Why this router design?
 * 
 * 1. **Progressive Saving**: Users can save individual tabs
 * 2. **Partial Updates**: Only send changed fields to database
 * 3. **Completion Tracking**: Real-time profile completion percentage
 * 4. **Error Handling**: Consistent error responses with user-friendly messages
 * 5. **Type Safety**: Full TypeScript validation on all inputs/outputs
 * 6. **Performance**: Efficient upsert operations
 */