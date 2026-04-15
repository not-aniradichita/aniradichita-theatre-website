import { gigOpportunities } from '../data/content';
import { SectionHeading } from '../components/SectionHeading';
import { useUiStore } from '../store/uiStore';

export function CastingPage() {
  const { openJoinModal } = useUiStore();

  return (
    <section className="bg-slate-950 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Casting & Opportunity Board"
          title="Opportunities for the Tribe"
          description="Updated every Monday. Prime gets 48hr early access. Browse free — apply with any membership."
        />
        <div className="mt-8 rounded-3xl border border-amber-400/20 bg-amber-500/10 p-6 text-sm text-amber-200">
          <strong className="font-semibold text-white">Browsing as guest.</strong> Join Community (₹999/yr) to apply for opportunities.
        </div>
        <div className="mt-8 space-y-4">
          {gigOpportunities.map((gig) => (
            <article
              key={gig.title}
              className="flex flex-col rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:border-brand-500 sm:flex-row sm:items-start sm:justify-between"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-800 text-2xl">
                  {gig.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{gig.title}</h3>
                  <p className="mt-2 text-sm text-slate-500">{gig.meta}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-400">
                    {gig.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-slate-800 bg-slate-950 px-3 py-1">
                        {tag}
                      </span>
                    ))}
                    <span className="rounded-full bg-slate-800 px-3 py-1 text-slate-300">{gig.tierTag}</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={openJoinModal}
                disabled={gig.disabled}
                className="mt-5 rounded-2xl border border-slate-800 bg-slate-950 px-5 py-3 text-sm font-semibold text-slate-400 transition hover:border-brand-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-70 sm:mt-0 sm:ml-auto sm:self-center"
              >
                {gig.actionLabel}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
