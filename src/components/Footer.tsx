export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 px-4 py-10 text-center text-sm text-slate-400 sm:px-6 lg:px-8">
      <p className="font-semibold text-slate-100">The Thespian&apos;s Tribe</p>
      <p>Performing Arts As A Service · Vadodara, India</p>
      <div className="mt-3 flex flex-wrap justify-center gap-3 text-slate-400">
        <a className="transition hover:text-brand-400" href="https://discord.gg/thespianstribe">
          discord.gg/thespianstribe
        </a>
        <a className="transition hover:text-brand-400" href="https://wa.me/917801802962">
          WhatsApp: 7801802962
        </a>
        <a className="transition hover:text-brand-400" href="mailto:team@aniradichita.com">
          team@aniradichita.com
        </a>
      </div>
    </footer>
  );
}
