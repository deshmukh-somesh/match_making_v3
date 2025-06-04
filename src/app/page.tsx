import Link from 'next/link'
import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { LoginLink, LogoutLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components"


/**
 * Landing Page - Marketing site for non-authenticated users
 * 
 * If user is already logged in, redirect to dashboard
 * Otherwise, show marketing content with CTA to register/login
 */
export default async function HomePage() {
  // Check if user is already authenticated
  const user = await getCurrentUser();

  // If authenticated, redirect to dashboard
  if (user) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                MatrimonyPlatform
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* <Link
                href="/api/auth/login"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Login
              </Link> */}
              <LoginLink className="text-gray-600 hover:text-gray-900 transition-colors">
                Login
              </LoginLink>
              {/* <Link
                href="/api/auth/register"
                className="bg-rose-600 text-white px-6 py-2 rounded-lg hover:bg-rose-700 transition-colors"
              >
                Get Started
              </Link> */}
              <RegisterLink className="bg-rose-600 text-white px-6 py-2 rounded-lg hover:bg-rose-700 transition-colors">
                Get Started
              </RegisterLink>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Find Your
            <span className="text-rose-600 block">Perfect Match</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of people finding meaningful relationships.
            Create your profile, browse matches, and connect with your soulmate.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/api/auth/register"
              className="bg-rose-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-rose-700 transition-colors"
            >
              Start Your Journey
            </Link>
            <Link
              href="/api/auth/login"
              className="border-2 border-rose-600 text-rose-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-rose-50 transition-colors"
            >
              I Have an Account
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm text-center">
            <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Detailed Profiles</h3>
            <p className="text-gray-600">Create comprehensive profiles with photos, preferences, and personal details.</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm text-center">
            <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Matching</h3>
            <p className="text-gray-600">Advanced filters and compatibility matching to find your ideal partner.</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm text-center">
            <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Safe & Secure</h3>
            <p className="text-gray-600">Your privacy and security are our top priority with verified profiles.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Why this landing page approach?
 * 
 * 1. Redirects authenticated users to dashboard (no confusion)
 * 2. Clean, modern design that builds trust
 * 3. Clear CTAs for registration and login
 * 4. Features section explains value proposition
 * 5. Uses Kinde auth URLs directly (/api/auth/login, /api/auth/register)
 */