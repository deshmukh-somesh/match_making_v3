import { PrismaClient } from '@prisma/client'

// PrismaClient singleton pattern for optimal performance
// This prevents multiple instances in development with hot reloading
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db = globalForPrisma.prisma ?? new PrismaClient({
  log: ['query', 'error', 'warn'],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

/**
 * Why this pattern?
 * 
 * In development, Next.js hot reloading can create multiple PrismaClient instances,
 * which causes connection issues. This singleton pattern ensures we reuse the same
 * instance across hot reloads.
 * 
 * In production, the global object is reset on each deployment, so we get a fresh
 * instance every time, which is what we want.
 */