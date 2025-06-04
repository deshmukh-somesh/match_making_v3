import { z } from 'zod'

/**
 * Profile Form Validation Schemas
 * 
 * These schemas match our Prisma model and provide client-side validation.
 * We split them by tabs for better UX and performance.
 */

// Enum schemas that match our Prisma enums
export const GenderSchema = z.enum(['MALE', 'FEMALE', 'OTHER'])
export const FamilyTypeSchema = z.enum(['NUCLEAR', 'JOINT', 'OTHER'])
export const MaritalStatusSchema = z.enum(['NEVER_MARRIED', 'DIVORCED', 'WIDOWED', 'SEPARATED'])
export const ReligionSchema = z.enum(['HINDU', 'MUSLIM', 'CHRISTIAN', 'SIKH', 'BUDDHIST', 'JAIN', 'OTHER'])
export const ComplexionSchema = z.enum(['VERY_FAIR', 'FAIR', 'WHEATISH', 'DARK', 'VERY_DARK'])
export const BodyTypeSchema = z.enum(['SLIM', 'AVERAGE', 'ATHLETIC', 'HEAVY'])
export const DietSchema = z.enum(['VEGETARIAN', 'NON_VEGETARIAN', 'VEGAN', 'JAIN_VEGETARIAN'])
export const SmokingHabitSchema = z.enum(['NEVER', 'OCCASIONALLY', 'REGULARLY'])
export const DrinkingHabitSchema = z.enum(['NEVER', 'OCCASIONALLY', 'REGULARLY'])

// Helper functions for validation
const createOptionalString = (min = 1, max = 100) => 
  z.string().min(min, `Must be at least ${min} characters`).max(max, `Must be less than ${max} characters`).optional().or(z.literal(''))

const createOptionalNumber = (min = 1, max = 999) => 
  z.number().min(min, `Must be at least ${min}`).max(max, `Must be less than ${max}`).optional()

// Tab 1: Basic Information
export const BasicInfoSchema = z.object({
  firstName: createOptionalString(2, 50),
  lastName: createOptionalString(2, 50),
  dateOfBirth: z.date({
    required_error: "Date of birth is required",
  }).refine((date) => {
    const age = new Date().getFullYear() - date.getFullYear()
    return age >= 18 && age <= 80
  }, "Age must be between 18 and 80"),
  gender: GenderSchema,
  height: z.number()
    .min(120, "Height must be at least 120 cm")
    .max(250, "Height must be less than 250 cm")
    .optional(),
  weight: z.number()
    .min(30, "Weight must be at least 30 kg")
    .max(200, "Weight must be less than 200 kg")
    .optional(),
  phone: z.string()
    .regex(/^[+]?[0-9]{10,15}$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal('')),
  maritalStatus: MaritalStatusSchema.optional(),
  complexion: ComplexionSchema.optional(),
  bodyType: BodyTypeSchema.optional(),
})

// Tab 2: Location & Contact
export const LocationContactSchema = z.object({
  city: createOptionalString(2, 50),
  state: createOptionalString(2, 50),
  country: createOptionalString(2, 50),
})

// Tab 3: Education & Career
export const EducationCareerSchema = z.object({
  education: createOptionalString(2, 100),
  occupation: createOptionalString(2, 100),
  income: createOptionalString(2, 50),
  company: createOptionalString(2, 100),
})

// Tab 4: Family Information
export const FamilyInfoSchema = z.object({
  fatherName: createOptionalString(2, 50),
  motherName: createOptionalString(2, 50),
  siblings: createOptionalNumber(0, 20),
  familyType: FamilyTypeSchema.optional(),
  familyIncome: createOptionalString(2, 50),
})

// Tab 5: Religion & Culture
export const ReligionCultureSchema = z.object({
  religion: ReligionSchema.optional(),
  caste: createOptionalString(2, 50),
  subcaste: createOptionalString(2, 50),
  motherTongue: createOptionalString(2, 30),
  languages: z.array(z.string()).optional(),
})

// Tab 6: Lifestyle
export const LifestyleSchema = z.object({
  diet: DietSchema.optional(),
  smoking: SmokingHabitSchema.optional(),
  drinking: DrinkingHabitSchema.optional(),
  disabilities: createOptionalString(0, 200),
  bio: createOptionalString(10, 500),
  hobbies: z.array(z.string()).optional(),
})

// Tab 7: Partner Preferences - NO refines here
export const PartnerPreferencesSchema = z.object({
  partnerAgeMin: z.number()
    .min(18, "Minimum age must be at least 18")
    .max(80, "Minimum age must be less than 80")
    .optional(),
  partnerAgeMax: z.number()
    .min(18, "Maximum age must be at least 18")
    .max(80, "Maximum age must be less than 80")
    .optional(),
  partnerHeightMin: createOptionalNumber(120, 250),
  partnerHeightMax: createOptionalNumber(120, 250),
  partnerEducation: createOptionalString(2, 100),
  partnerOccupation: createOptionalString(2, 100),
  partnerIncome: createOptionalString(2, 50),
  partnerLocation: z.array(z.string()).optional(),
})

// Complete profile schema with ALL refines at the end
export const CompleteProfileSchema = BasicInfoSchema
  .merge(LocationContactSchema)
  .merge(EducationCareerSchema)
  .merge(FamilyInfoSchema)
  .merge(ReligionCultureSchema)
  .merge(LifestyleSchema)
  .merge(PartnerPreferencesSchema)
  .refine((data) => {
    // Ensure max age is greater than min age
    if (data.partnerAgeMin && data.partnerAgeMax) {
      return data.partnerAgeMax >= data.partnerAgeMin
    }
    return true
  }, {
    message: "Maximum age must be greater than or equal to minimum age",
    path: ["partnerAgeMax"]
  })
  .refine((data) => {
    // Ensure max height is greater than min height
    if (data.partnerHeightMin && data.partnerHeightMax) {
      return data.partnerHeightMax >= data.partnerHeightMin
    }
    return true
  }, {
    message: "Maximum height must be greater than or equal to minimum height",
    path: ["partnerHeightMax"]
  })


  // Type inference for TypeScript : 
  export type BasicInfoFormData = z.infer<typeof BasicInfoSchema>
  export type LocationContactFormData = z.infer<typeof LocationContactSchema>
  export type EducationCareerFormData = z.infer<typeof EducationCareerSchema>
  export type FamilyInfoFormData = z.infer<typeof FamilyInfoSchema>
  export type ReligionCultureFormData = z.infer<typeof ReligionCultureSchema>
  export type LifestyleFormData = z.infer<typeof LifestyleSchema>
  export type PartnerPreferencesFromData = z.infer<typeof PartnerPreferencesSchema>
  export type CompleteProfileFormData = z.infer<typeof CompleteProfileSchema>


  
/**
 * Why this validation approach?
 * 
 * 1. **Tab-based schemas**: Each tab has its own schema for progressive validation
 * 2. **Type safety**: Zod schemas generate TypeScript types automatically
 * 3. **Prisma alignment**: Enums match exactly with our database schema
 * 4. **User-friendly errors**: Custom error messages for better UX
 * 5. **Cross-field validation**: Age ranges, height ranges must be logical
 * 6. **Optional by default**: Users can save partial profiles (MVP approach)
 */