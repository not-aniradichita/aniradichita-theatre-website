import { ritualEvents } from '../data/content';
import { SectionHeading } from '../components/SectionHeading';
import { useUiStore } from '../store/uiStore';

export function RitualsPage() {
  const { openJoinModal } = useUiStore();

  return (
    <section className="bg-slate-950 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Weekly Rituals"
          title="The Tribe's heartbeat"
          description="Three non-negotiable rituals every week. Join with any paid membership."
        />
        <div className="mt-8 space-y-4">
          {ritualEvents.map((event) => (
            <article
              key={event.title}
              className={event.highlighted ? 'rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-lg shadow-brand-500/20 transition hover:border-brand-500' : 'rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:border-brand-500'}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-20 w-20 flex-col items-center justify-center rounded-3xl bg-slate-950 text-center text-white shadow-sm">
                    <span className="text-3xl font-black">{event.day}</span>
                    <span className="text-xs uppercase tracking-[0.25em] text-slate-400">{event.month}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{event.title}</h3>
                    <p className="mt-2 text-sm text-slate-500">{event.meta}</p>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-400">
                      {event.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-slate-800 bg-slate-950 px-3 py-1">
                          {tag}
                        </span>
                      ))}
                      {event.statusTag ? <span className="rounded-full border border-amber-400/20 bg-amber-500/10 px-3 py-1 text-amber-300">{event.statusTag}</span> : null}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={openJoinModal}
                  className="mt-4 rounded-2xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-600 sm:mt-0"
                >
                  {event.cta}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
