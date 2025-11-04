import { useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200">
      <nav className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="shrink-0">
            <Link to="/" className="flex items-center">
              <img 
                src="/logo.png"
                alt="BGRemover Logo" 
                className="h-60 w-auto"
              />
            </Link>
          </div>

          {/* Right Side - Auth Buttons */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <button className="px-5 py-2 text-sm text-black font-semibold hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200 cursor-pointer">
              Login
            </button>
            <button className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-800 hover:bg-blue-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform cursor-pointer">
              Create Account
            </button>
          </div>

          {/* Mobile menu button */}  
          <div className="md:hidden relative">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-[50vw] bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-4 space-y-2">
                  <button className="w-full text-center px-4 py-2.5 text-sm font-semibold text-black hover:bg-gray-50 rounded-lg transition-all duration-200">
                    Login
                  </button>
                  <button className="w-full px-4 py-2.5 text-sm font-semibold text-white bg-blue-800 hover:bg-blue-900 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                    Create Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header