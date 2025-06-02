import Link from 'next/link'
import { getCurrentUserFromDB } from '@/lib/auth'

/**
 * Dashboard Home Page
 * 
 * This is the main dashboard that users see after login.
 * Shows profile status, recent activity, and quick actions.
 */
export default async function DashboardPage() {
  const user = await getCurrentUserFromDB();
  
  if (!user) {
    return null; // This shouldn't happen due to layout protection
  }

  const profileComplete = user.profile?.isComplete || false;
  const hasPhotos = user.profile?.photos && user.profile.photos.length > 0;

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user.name || 'User'}! 👋
            </h1>
            <p className="text-gray-600 mt-1">
              {profileComplete 
                ? "Your profile is ready. Start exploring matches!"
                : "Let's complete your profile to find better matches."
              }
            </p>
          </div>
          {!profileComplete && (
            <Link
              href="/profile"
              className="bg-rose-600 text-white px-6 py-2 rounded-lg hover:bg-rose-700 transition-colors"
            >
              Complete Profile
            </Link>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Profile</h3>
              <p className="text-sm text-gray-600">
                {profileComplete ? "Complete" : "Incomplete"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Interests</h3>
              <p className="text-sm text-gray-600">0 received</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Matches</h3>
              <p className="text-sm text-gray-600">0 new</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Profile Setup */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Profile Setup
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Basic Information</span>
              <span className={`text-sm font-medium ${profileComplete ? 'text-green-600' : 'text-orange-600'}`}>
                {profileComplete ? 'Complete' : 'Incomplete'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Photos</span>
              <span className={`text-sm font-medium ${hasPhotos ? 'text-green-600' : 'text-orange-600'}`}>
                {hasPhotos ? 'Added' : 'Missing'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Preferences</span>
              <span className="text-sm font-medium text-orange-600">
                Not Set
              </span>
            </div>
          </div>
          <Link
            href="/profile"
            className="block w-full mt-4 bg-rose-600 text-white text-center py-2 rounded-lg hover:bg-rose-700 transition-colors"
          >
            Update Profile
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <Link
              href="/matches"
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 text-gray-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-gray-700">Browse Matches</span>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <Link
              href="/profile"
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 text-gray-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span className="text-gray-700">Edit Profile</span>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <button
              disabled
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50 cursor-not-allowed opacity-60"
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                <span className="text-gray-500">Upgrade to Premium</span>
              </div>
              <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                Coming Soon
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Activity
        </h3>
        <div className="text-center py-12">
          <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-500">No recent activity</p>
          <p className="text-gray-400 text-sm mt-1">
            Complete your profile to start getting matches
          </p>
        </div>
      </div>
    </div>
  )
}

/**
 * Why this dashboard design?
 * 
 * 1. Clear welcome message with user's name
 * 2. Profile completion status front and center
 * 3. Quick stats give overview of account status
 * 4. Action cards guide users to next steps
 * 5. Recent activity section (empty state for new users)
 * 6. Mobile-responsive card layout
 * 7. Visual hierarchy with proper spacing and shadows
 */