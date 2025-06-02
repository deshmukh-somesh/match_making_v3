import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

/**
 * Auth Layout - For login and register pages
 * 
 * This layout:
 * 1. Redirects authenticated users to dashboard
 * 2. Provides a clean, minimal layout for auth forms
 * 3. No navigation bars - just the auth form
 */
export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // If user is already authenticated, redirect to dashboard
  const user = await getCurrentUser();
  
  if (user) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            MatrimonyPlatform
          </h1>
          <p className="text-gray-600 mt-2">Find your perfect match</p>
        </div>
        
        {/* Auth form container */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {children}
        </div>
        
        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
    </div>
  )
}

/**
 * Why this layout approach?
 * 
 * 1. Route group (auth) means these pages don't inherit the main nav
 * 2. Clean, focused design for auth flows
 * 3. Automatic redirect if already logged in
 * 4. Consistent branding and styling
 * 5. Mobile-responsive container
 */