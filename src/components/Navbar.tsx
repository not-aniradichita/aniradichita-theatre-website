import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUIStore } from '../store/modalStore';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const { mobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Our Works', path: '/works' },
    { label: 'Events', path: '/events' },
    { label: 'Book Studio', path: '/studio' },
    { label: 'Blogs', path: '/blogs' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    closeMobileMenu();
  };

  return (
    <>
      {/* Desktop & Mobile Navbar */}
      <nav
        className={`fixed top-0 w-full z-40 px-4 sm:px-8 transition-all duration-300 ${
          isScrolled ? 'bg-black/97' : 'bg-gradient-to-b from-black/95 to-transparent'
        }`}
      >
        <div className="flex items-center justify-between h-[60px]">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('/')}
            className="text-base sm:text-xl font-black text-red-600 tracking-wider flex-shrink-0 cursor-pointer hover:text-red-500 transition-colors"
          >
            ANIRADICHITA
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-4 lg:gap-6 flex-1 ml-8 lg:ml-12">
            {navLinks.map(({ label, path }) => (
              <button
                key={path}
                onClick={() => handleNavClick(path)}
                className="text-xs font-medium text-gray-400 hover:text-white transition-colors uppercase tracking-wide whitespace-nowrap"
              >
                {label}
              </button>
            ))}
          </div>

          {/* Search & Mobile Menu */}
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="🔍 Search..."
              className="hidden lg:block bg-gray-900/80 border border-gray-700 text-white px-3 py-1.5 rounded text-xs outline-none focus:border-gray-500 transition-colors w-32"
            />
            
            {/* Hamburger Menu */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden flex flex-col gap-1.5 p-1 cursor-pointer"
              aria-label="Toggle menu"
            >
              <span className="w-5 h-0.5 bg-white rounded block"></span>
              <span className="w-5 h-0.5 bg-white rounded block"></span>
              <span className="w-5 h-0.5 bg-white rounded block"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed top-[60px] left-0 w-full bg-black/98 z-39 border-t border-gray-900 md:hidden">
          <div className="flex flex-col gap-0">
            {navLinks.map(({ label, path }) => (
              <button
                key={path}
                onClick={() => handleNavClick(path)}
                className="px-4 py-3 text-sm text-gray-300 hover:text-white border-b border-gray-900 text-left transition-colors"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
