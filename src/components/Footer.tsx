import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-gray-900">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-9 px-4 sm:px-8 py-9 mb-8">
        {/* Brand */}
        <div>
          <h3 className="text-xl font-black text-red-600 mb-2.5">ANIRADICHITA</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            India's first Performing Arts As A Service startup. Section 8 Not-for-Profit. Top 50 Startup 2021.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">Navigate</h4>
          <div className="space-y-2">
            {[
              { label: 'Home', path: '/' },
              { label: 'About', path: '/about' },
              { label: 'Services', path: '/services' },
              { label: 'Our Works', path: '/works' },
              { label: 'Events', path: '/events' },
              { label: 'Book Studio', path: '/studio' },
              { label: 'Blogs', path: '/blogs' },
              { label: 'Contact', path: '/contact' },
            ].map(({ label, path }) => (
              <button
                key={path}
                onClick={() => handleNavigate(path)}
                className="block text-xs text-gray-600 hover:text-white transition-colors"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">Services</h4>
          <div className="space-y-2">
            <button className="block text-xs text-gray-600 hover:text-white transition-colors">
              Pravartan
            </button>
            <button className="block text-xs text-gray-600 hover:text-white transition-colors">
              Aakhyan
            </button>
            <button className="block text-xs text-gray-600 hover:text-white transition-colors">
              Aamarsh
            </button>
            <button className="block text-xs text-gray-600 hover:text-white transition-colors">
              Abhisarg
            </button>
          </div>
        </div>

        {/* Connect */}
        <div>
          <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">Connect</h4>
          <div className="space-y-2">
            <a
              href="https://aniradichita.wordpress.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-xs text-gray-600 hover:text-white transition-colors"
            >
              Website
            </a>
            <a
              href="https://www.facebook.com/aniradichita/"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-xs text-gray-600 hover:text-white transition-colors"
            >
              Facebook
            </a>
            <button
              onClick={() => handleNavigate('/studio')}
              className="block text-xs text-gray-600 hover:text-white transition-colors text-left"
            >
              Book Studio
            </button>
            <button
              onClick={() => handleNavigate('/contact')}
              className="block text-xs text-gray-600 hover:text-white transition-colors text-left"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-900 px-4 sm:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs">
        <p className="text-gray-600">
          © 2026 <span className="text-red-600">Aniradichita</span> Theatre and Films Association · All Rights Reserved · Section 8 Not-for-Profit
        </p>
        <p className="text-gray-700">
          Made with ❤️ for <span className="text-red-600">Performing Arts</span>
        </p>
      </div>
    </footer>
  );
};
