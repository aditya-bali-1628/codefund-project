'use client';

import Link from 'next/link';
import { FireIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const toggleMenu = () => setOpen(!open);

  const handleDashboardClick = () => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  };

  return (
    <nav className="bg-blue-950 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        {/* Top Bar with Logo and Hamburger */}
        <div className="flex justify-between items-center p-4">
          {/* Brand - Always visible */}
          <Link href="/" className="flex items-center space-x-2 text-xl sm:text-2xl font-bold z-50">
            <FireIcon className="w-6 h-6 sm:w-7 sm:h-7 text-orange-400 animate-spin" />
            <span>CodeFund</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-blue-300 transition-colors">
              Home
            </Link>
            {status === 'authenticated' && session?.user?.name && (
              <>
                <Link href={`/${session.user.name}`} className="hover:text-blue-300 transition-colors">
                  Your Page
                </Link>
                <Link href="/about" className="hover:text-blue-300 transition-colors">
                  About
                </Link>
                <Link href="/Contact" className="hover:text-blue-300 transition-colors">
                  Contact
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu}
              className="text-white focus:outline-none p-2 rounded-md hover:bg-blue-800 transition-colors"
              aria-label="Toggle menu"
            >
              {open ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex ml-4 gap-3 items-center">
            <button
              onClick={handleDashboardClick}
              className="px-3 py-2 rounded-full text-sm font-medium bg-gradient-to-br from-purple-600 to-blue-500 hover:from-blue-500 hover:to-purple-600 transition-all duration-300 hover:shadow-lg"
            >
              Dashboard
            </button>

            {session ? (
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="px-3 py-2 rounded-full text-sm bg-red-600 hover:bg-red-700 transition-all duration-300 hover:shadow-lg"
              >
                Log out
              </button>
            ) : (
              <Link href="/login">
                <button className="px-3 py-2 rounded-full text-sm font-medium bg-green-600 hover:bg-green-700 transition-all duration-300 hover:shadow-lg">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu - appears below the logo */}
        {open && (
          <div className="md:hidden bg-blue-900 pb-4 px-4 shadow-lg">
            <ul className="space-y-2 py-2">
              <li>
                <Link 
                  href="/" 
                  className="block px-4 py-2 hover:bg-blue-800 rounded-md transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Home
                </Link>
              </li>
              
              {status === 'authenticated' && session?.user?.name && (
                <>
                  <li>
                    <Link 
                      href={`/${session.user.name}`} 
                      className="block px-4 py-2 hover:bg-blue-800 rounded-md transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      Your Page
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/about" 
                      className="block px-4 py-2 hover:bg-blue-800 rounded-md transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/Contact" 
                      className="block px-4 py-2 hover:bg-blue-800 rounded-md transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      Contact
                    </Link>
                  </li>
                </>
              )}
            </ul>

            <div className="flex flex-col space-y-2 pt-2 border-t border-blue-800">
              <button
                onClick={() => {
                  handleDashboardClick();
                  setOpen(false);
                }}
                className="w-full px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-br from-purple-600 to-blue-500 hover:from-blue-500 hover:to-purple-600 transition-all duration-300"
              >
                Dashboard
              </button>
              
              {session ? (
                <button
                  onClick={() => {
                    signOut({ callbackUrl: '/login' });
                    setOpen(false);
                  }}
                  className="w-full px-4 py-2 rounded-full text-sm bg-red-600 hover:bg-red-700 transition-all duration-300"
                >
                  Log out
                </button>
              ) : (
                <Link href="/login" className="w-full">
                  <button 
                    onClick={() => setOpen(false)}
                    className="w-full px-4 py-2 rounded-full text-sm font-medium bg-green-600 hover:bg-green-700 transition-all duration-300"
                  >
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;