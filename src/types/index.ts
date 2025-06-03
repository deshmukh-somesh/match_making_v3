import type { User, Profile, Interest, InterestSent, Payment } from '@prisma/client'

// User with profile included 
export type UserWithProfile = User & {
    profile: Profile | null
}


// User with all relations 
export type UserWithRelations = User & {
    profile: Profile | null
    interests: Interest[]
    sentInterests: InterestSent[]
    receivedInterests: InterestSent[]
    payments: Payment[]

}


// Profile with user included 
export type ProfileWithUser = Profile & {
    user: User
}


// Interest with user details : 
export type InterestWithUsers = InterestSent & {
    sender: UserWithProfile
    receiver: UserWithProfile
}


// Common response types : 
export interface ApiResponse<T = any>{
    success: boolean
    data? : T
    error?: string
    message?: string
}


// Form types for profile creation/editing
export interface ProfileFormData {
  // Basic Info
  firstName?: string
  lastName?: string
  dateOfBirth?: Date
  gender?: 'MALE' | 'FEMALE' | 'OTHER'
  height?: number
  weight?: number
  
  // Contact & Location
  phone?: string
  city?: string
  state?: string
  country?: string
  
  // Education & Career
  education?: string
  occupation?: string
  income?: string
  company?: string
  
  // Add other fields as needed
}

// Authentication types
export interface AuthUser {
  id: string
  kindeId: string
  email: string
  name?: string
  avatar?: string
  isActive: boolean
}

/**
 * These types extend Prisma's generated types with commonly used combinations
 * and form data structures. They provide better TypeScript support throughout
 * the application.
 */