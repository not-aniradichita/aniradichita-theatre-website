import { activityFeed, contributionLogs, growthStages, profileBadges } from '../data/content';
import { SectionHeading } from '../components/SectionHeading';

export function ProfilePage() {
  return (
    <section className="bg-slate-950 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900 shadow-2xl shadow-slate-950/40">
          <div className="relative h-72 overflow-hidden rounded-b-[2rem]">
            <img
              src="https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=1200&q=80"
              alt="cover"
              className="h-full w-full object-cover brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          </div>
          <div className="relative bg-slate-950 px-6 pb-10 pt-10 sm:px-10">
            <div className="absolute left-10 top-0 h-24 w-24 overflow-hidden rounded-full border-4 border-slate-950 bg-slate-900">
              <img src="https://i.pravatar.cc/150?img=11" alt="Aniket" className="h-full w-full object-cover" />
            </div>
            <div className="ml-36 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-3xl font-extrabold text-white">Aniket Pandya</p>
                <p className="mt-2 text-sm text-slate-400">Theatre & Films · Founder · Vadodara</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-200">
                  {['Theatre', 'Films', 'Direction'].map((pill) => (
                    <span key={pill} className="rounded-full border border-brand-500/20 bg-brand-500/10 px-3 py-1">{pill}</span>
                  ))}
                  <span className="rounded-full border border-amber-400/20 bg-amber-500/10 px-3 py-1 text-amber-200">Privilege Member</span>
                </div>
              </div>
              <div className="text-sm text-slate-400">
                <p>Journey Stage</p>
                <p className="mt-1 text-base font-semibold text-brand-400">Tribe Leader</p>
                <p className="mt-1">Level 8</p>
              </div>
            </div>

            <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-950 p-6">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">XP Progress — Level 8 → Level 9</p>
                  <p className="text-sm text-slate-500">2,340 / 3,000 XP</p>
                  <div className="h-3 overflow-hidden rounded-full bg-slate-900">
                    <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-brand-700 to-brand-500" />
                  </div>
                </div>
                <div className="rounded-3xl bg-amber-500/10 p-5 text-white">
                  <p className="text-3xl font-extrabold">🔥 14</p>
                  <p className="mt-1 text-sm text-slate-300">Day streak! Keep it going.</p>
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { value: '34', label: 'Performances' },
                { value: '12', label: 'Mentored' },
                { value: '8', label: 'Collabs' },
                { value: '3', label: 'Gigs Earned' },
                { value: '2,340', label: 'Total XP' },
                { value: '47', label: 'Content Posts' },
              ].map((item) => (
                <div key={item.label} className="rounded-3xl border border-slate-800 bg-slate-900 p-5 text-center">
                  <p className="text-3xl font-extrabold text-white">{item.value}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.3em] text-slate-500">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 xl:grid-cols-3">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-lg font-semibold text-white">Badges & Achievements</h3>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {profileBadges.map((badge) => (
                <div
                  key={badge.label}
                  className={
                    `rounded-3xl border p-4 text-center transition ${badge.earned ? 'border-amber-500/40 bg-amber-500/10 text-amber-200' : 'border-slate-800 bg-slate-950 text-slate-400'}`
                  }
                >
                  <div className="text-2xl">{badge.icon}</div>
                  <p className="mt-3 text-sm">{badge.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
            <div className="mt-5 space-y-3">
              {activityFeed.map((item) => (
                <div key={item.description} className="flex items-center gap-4 rounded-3xl bg-slate-950 p-4">
                  <div className={
                    `flex h-11 w-11 items-center justify-center rounded-2xl text-lg ${
                      item.tone === 'brand' ? 'bg-brand-500/15 text-brand-400' : item.tone === 'purple' ? 'bg-violet-500/15 text-violet-300' : item.tone === 'green' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-amber-500/15 text-amber-300'
                    }`
                  }>
                    {item.icon}
                  </div>
                  <div className="flex-1 text-sm text-slate-300">{item.description}</div>
                  <div className="text-sm font-semibold text-slate-100">{item.points}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-lg font-semibold text-white">Growth Path</h3>
            <div className="mt-6 space-y-5">
              {growthStages.map((stage) => (
                <div key={`${stage.from}-${stage.to}`}>
                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <span>{stage.from} → {stage.to}</span>
                    <span className={stage.complete ? 'text-emerald-400' : 'text-slate-500'}>{stage.complete ? 'Done ✓' : `${stage.progress}%`}</span>
                  </div>
                  <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-950">
                    <div className={`h-full rounded-full ${stage.complete ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${stage.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-3xl border border-amber-400/20 bg-amber-500/10 p-4 text-sm text-slate-300">
              <p className="font-semibold text-amber-200">Next milestone</p>
              <p className="mt-2 text-slate-400">Complete 2 more mentorship sessions to unlock Tribe Leader status</p>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="text-lg font-semibold text-white">Contribution Log</h3>
          <div className="mt-5 space-y-3">
            {contributionLogs.map((log) => (
              <div key={log.label} className="flex items-center gap-4 rounded-3xl border border-slate-800 bg-slate-950 px-4 py-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-800 text-lg">{log.icon}</div>
                <div className="flex-1 text-sm text-slate-300">{log.label}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-slate-500">{log.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
