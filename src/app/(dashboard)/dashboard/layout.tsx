import Link from 'next/link'
import { getCurrentUserFromDB } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';

/**
 * Dashboard Layout - For authenticated users
 * 
 * This layout:
 * 1. Ensures user is authenticated
 * 2. Provides navigation between dashboard sections
 * 3. Shows user info and logout option
 * 4. Syncs user from Kinde to our database
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get user from our database (this also syncs from Kinde)
  const user = await getCurrentUserFromDB();

  // If not authenticated, redirect to login
  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link href="/dashboard" className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">
                MatrimonyPlatform
              </h1>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/profile"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                My Profile
              </Link>
              <Link
                href="/matches"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Matches
              </Link>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {/* Profile Completion Status */}
              {!user.profile?.isComplete && (
                <Link
                  href="/profile"
                  className="bg-rose-100 text-rose-800 text-sm px-3 py-1 rounded-full hover:bg-rose-200 transition-colors"
                >
                  Complete Profile
                </Link>
              )}

              {/* User Avatar */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-rose-600 rounded-full flex items-center justify-center">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name || 'User'}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-sm font-medium">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </span>
                  )}
                </div>
                <span className="hidden sm:block text-gray-700 font-medium">
                  {user.name || user.email}
                </span>
              </div>

              {/* Logout */}
              {/* this is causing cors issue */}
              {/* <Link
                href="/api/auth/logout"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Logout
              </Link> */}
              
              <LogoutLink className="text-gray-600 hover:text-gray-900 transition-colors">
                Logout
              </LogoutLink>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-white border-b">
        <div className="px-4 py-2 space-x-8 overflow-x-auto flex">
          <Link
            href="/dashboard"
            className="text-gray-600 hover:text-gray-900 whitespace-nowrap"
          >
            Dashboard
          </Link>
          <Link
            href="/profile"
            className="text-gray-600 hover:text-gray-900 whitespace-nowrap"
          >
            Profile
          </Link>
          <Link
            href="/matches"
            className="text-gray-600 hover:text-gray-900 whitespace-nowrap"
          >
            Matches
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}

/**
 * Why this dashboard layout?
 * 
 * 1. Automatic user sync from Kinde to our DB
 * 2. Profile completion reminder for new users
 * 3. Clean navigation between dashboard sections
 * 4. Responsive design for mobile/desktop
 * 5. User context is available to all child pages
 */