import { memberProfiles } from '../data/content';
import { SectionHeading } from '../components/SectionHeading';
import { useUiStore } from '../store/uiStore';

export function MembersPage() {
  const { openJoinModal } = useUiStore();

  return (
    <section className="bg-slate-950 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="The Tribe"
          title="Your fellow artists"
          description="Identity-first profiles — art form, city, journey stage. No follower counts."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {memberProfiles.map((member) => (
            <article
              key={member.name}
              className="group overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 transition hover:border-brand-500"
              onClick={openJoinModal}
            >
              <div className={`relative h-40 bg-gradient-to-br ${member.coverGradient}`}>
                <div className="absolute left-6 bottom-[-28px] h-24 w-24 overflow-hidden rounded-full border-4 border-slate-950 bg-slate-800">
                  <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
                </div>
              </div>
              <div className="pt-16 px-6 pb-6">
                <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                <p className="mt-2 text-sm text-slate-400">{member.role}</p>
                <span className={
                  `mt-4 inline-flex rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em] ${
                    member.membership === 'Privilege'
                      ? 'bg-amber-500/15 text-amber-300'
                      : member.membership === 'Prime'
                      ? 'bg-violet-500/15 text-violet-300'
                      : 'bg-slate-800 text-slate-300'
                  }`
                }>{member.membership}</span>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-400">
                  {member.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-slate-800 bg-slate-950 px-3 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
