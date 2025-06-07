// layout.tsx - Production ready
import { Inter } from 'next/font/google'
import './globals.css'
import { TRPCProvider } from '@/components/providers/trpc-provider'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
})

export const metadata = {
  title: 'Matrimonial Platform',
  description: 'Find your perfect match',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <TRPCProvider>
          <div className="min-h-screen bg-gray-50">
            {children}
          </div>
        </TRPCProvider>
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