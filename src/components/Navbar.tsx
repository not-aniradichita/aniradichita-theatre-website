import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { navLinks } from '../data/content';
import { useUiStore } from '../store/uiStore';
import { classNames } from '../utils/classNames';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { openJoinModal, theme, toggleTheme } = useUiStore();

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 text-sm font-semibold text-white">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-700 to-brand-500 text-lg font-black text-white shadow-glow">
            TTT
          </div>
          <span>
            Thespian&apos;s <span className="text-brand-400">Tribe</span>
          </span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                classNames(
                  'rounded-full px-3 py-2 text-xs font-medium transition-all duration-200',
                  isActive ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
          <button
            onClick={openJoinModal}
            className="rounded-full bg-brand-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-brand-600"
          >
            Join the Tribe
          </button>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-full border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-300 transition hover:border-slate-500 hover:text-white"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((state) => !state)}
          className="inline-flex items-center justify-center rounded-full border border-slate-800 bg-slate-900 p-2 text-slate-300 transition hover:border-slate-600 hover:text-white md:hidden"
          aria-label="Toggle navigation"
        >
          <span>{isOpen ? '✕' : '☰'}</span>
        </button>
      </div>

      {isOpen ? (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-slate-800 bg-slate-950/95 md:hidden"
        >
          <div className="space-y-2 px-4 pb-4 pt-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  classNames(
                    'block rounded-2xl px-4 py-3 text-sm font-medium transition-all',
                    isActive ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            <button
              onClick={() => {
                openJoinModal();
                setIsOpen(false);
              }}
              className="w-full rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
            >
              Join the Tribe
            </button>
          </div>
        </motion.div>
      ) : null}
    </header>
  );
}
