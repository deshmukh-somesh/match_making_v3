import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Matrimonial Platform - Find Your Perfect Match',
  description: 'A modern matrimonial platform to help you find your life partner',
}

/**
 * Root Layout Component
 * 
 * This is the root layout that wraps all pages. We keep it minimal here
 * because different route groups will have their own layouts.
 * 
 * - (auth) routes: No navigation (clean login/register)
 * - (dashboard) routes: Full navigation with user menu
 * - Landing page: Marketing navigation
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  )
}

/**
 * Why this structure?
 * 
 * 1. Root layout is minimal - just fonts and basic styling
 * 2. Route groups will have their own layouts for navigation
 * 3. This gives us maximum flexibility for different page types
 * 4. Clean separation between marketing, auth, and dashboard areas
 */