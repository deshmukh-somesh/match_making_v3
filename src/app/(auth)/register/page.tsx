import Link from 'next/link'

/**
 * Custom Register Page
 * 
 * Similar to login page but focused on new user registration.
 * Kinde handles the actual registration flow.
 */
export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
        <p className="text-gray-600 mt-2">Start your journey to find love</p>
      </div>

      {/* Social Registration Options */}
      <div className="space-y-3">
        <Link
          href="/api/auth/register?connection_id=google"
          className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
        >
          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Sign up with Google
        </Link>

        <Link
          href="/api/auth/register"
          className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
        >
          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
          </svg>
          Sign up with Email
        </Link>
      </div>

      {/* Benefits */}
      <div className="bg-rose-50 p-4 rounded-lg">
        <h3 className="font-medium text-gray-900 mb-2">Why join us?</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Verified profiles for safety</li>
          <li>• Advanced matching algorithm</li>
          <li>• Privacy controls you can trust</li>
          <li>• Success stories from real couples</li>
        </ul>
      </div>

      {/* Divider */}
      <div className="text-center">
        <span className="text-gray-500 text-sm">Already have an account?</span>
      </div>

      {/* Login Link */}
      <Link
        href="/login"
        className="w-full border-2 border-rose-600 text-rose-600 py-3 px-4 rounded-lg hover:bg-rose-50 transition-colors text-center block font-medium"
      >
        Sign In
      </Link>

      {/* Back to Home */}
      <div className="text-center">
        <Link href="/" className="text-rose-600 hover:text-rose-700 text-sm">
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}

/**
 * Why this registration approach?
 * 
 * 1. Highlights the benefits of joining
 * 2. Clear social sign-up options
 * 3. Easy transition to login for existing users
 * 4. Builds trust with security messaging
 * 5. Consistent with login page design
 */