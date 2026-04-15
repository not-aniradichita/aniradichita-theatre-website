import { useEffect, useRef } from 'react';
import { useUiStore } from '../store/uiStore';
import { classNames } from '../utils/classNames';

const tiers = [
  { label: 'School Student — ₹999/year', flavor: 'success' },
  { label: 'Community — ₹999/year', flavor: 'primary' },
  { label: 'Prime — ₹1,999/year', flavor: 'gold' },
  { label: 'Privilege — ₹6,999/6 months', flavor: 'amber' },
  { label: 'Artiverse Offer — ₹499/3 months', flavor: 'green' },
];

export function JoinModal() {
  const { isJoinModalOpen, closeJoinModal } = useUiStore();
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeJoinModal();
      }
    }

    if (isJoinModalOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => window.removeEventListener('keydown', handleEscape);
  }, [isJoinModalOpen, closeJoinModal]);

  return (
    <div
      className={classNames(
        'fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-6 transition-opacity',
        isJoinModalOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      )}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          closeJoinModal();
        }
      }}
    >
      <div
        ref={dialogRef}
        className={classNames(
          'w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl shadow-slate-950/40 transition-transform',
          isJoinModalOpen ? 'translate-y-0' : 'translate-y-8'
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="join-modal-title"
      >
        <div className="mb-4 text-4xl">🎭</div>
        <h2 id="join-modal-title" className="text-2xl font-extrabold text-white">
          Join the Tribe
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          Start free, or pick a tier to participate, collaborate, and grow.
        </p>
        <div className="mt-6 grid gap-3">
          {tiers.map((tier) => (
            <button
              key={tier.label}
              type="button"
              className={classNames(
                'rounded-2xl px-4 py-3 text-left text-sm font-semibold transition',
                tier.flavor === 'success' && 'bg-slate-800 text-emerald-300 hover:bg-slate-700',
                tier.flavor === 'primary' && 'bg-slate-800 text-slate-100 hover:bg-slate-700',
                tier.flavor === 'gold' && 'bg-slate-800 text-amber-300 hover:bg-slate-700',
                tier.flavor === 'amber' && 'bg-slate-800 text-orange-300 hover:bg-slate-700',
                tier.flavor === 'green' && 'bg-slate-800 text-emerald-200 hover:bg-slate-700'
              )}
            >
              {tier.label}
            </button>
          ))}
        </div>
        <div className="mt-5 text-xs text-slate-500">
          WhatsApp: <a className="text-brand-400 hover:text-brand-300" href="https://wa.me/917801802962">7801802962</a> ·
          <a className="text-brand-400 hover:text-brand-300" href="mailto:team@aniradichita.com"> team@aniradichita.com</a>
        </div>
        <button
          type="button"
          onClick={closeJoinModal}
          className="mt-6 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-900"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}
