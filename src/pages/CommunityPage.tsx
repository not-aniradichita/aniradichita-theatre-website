import { useMemo } from 'react';
import { useCommunityFeed } from '../hooks/useCommunityFeed';
import { communityChannels } from '../data/content';
import { useUiStore } from '../store/uiStore';
import { classNames } from '../utils/classNames';

export function CommunityPage() {
  const { openJoinModal } = useUiStore();
  const { data: posts, isLoading } = useCommunityFeed();

  const leftChannels = useMemo(() => communityChannels.slice(0, 3), []);
  const middleChannels = useMemo(() => communityChannels.slice(3, 7), []);
  const rightChannels = useMemo(() => communityChannels.slice(7), []);

  return (
    <section className="bg-slate-950 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[220px_minmax(0,_1fr)_220px]">
        <aside className="hidden flex-col gap-4 lg:flex">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-400">Information</h2>
            <div className="mt-4 space-y-2">
              {leftChannels.map((channel) => (
                <div key={channel.title} className="flex items-center gap-3 rounded-2xl bg-slate-950 px-4 py-3 text-sm text-slate-300">
                  <span className={classNames('h-2 w-2 rounded-full', channel.selected ? 'bg-brand-500' : 'bg-slate-700')} />
                  {channel.title}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-400">Community</h2>
            <div className="mt-4 space-y-2">
              {middleChannels.map((channel) => (
                <div
                  key={channel.title}
                  className={classNames(
                    'flex items-center justify-between gap-3 rounded-2xl px-4 py-3 text-sm transition',
                    channel.locked ? 'cursor-not-allowed bg-slate-950 text-slate-500 opacity-70' : 'bg-slate-950 text-slate-300 hover:bg-slate-800'
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span className={classNames('h-2 w-2 rounded-full', channel.locked ? 'bg-slate-700' : 'bg-brand-500')} />
                    {channel.title}
                  </span>
                  {channel.tierLabel ? <span className="rounded-full bg-slate-800 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-400">{channel.tierLabel}</span> : null}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-400">Privilege</h2>
            <div className="mt-4 space-y-2">
              {rightChannels.map((channel) => (
                <div key={channel.title} className="flex items-center justify-between gap-3 rounded-2xl bg-slate-950 px-4 py-3 text-sm text-slate-500">
                  <span className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-slate-700" />
                    {channel.title}
                  </span>
                  <span className="rounded-full bg-slate-800 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-400">{channel.tierLabel}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-white">You&apos;re browsing as a guest</p>
                <p className="mt-2 text-sm text-slate-400">Read everything — posting, replying & joining sessions requires membership.</p>
              </div>
              <button
                type="button"
                onClick={openJoinModal}
                className="inline-flex items-center justify-center rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
              >
                Join from ₹999/yr
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">Loading community feed...</div>
          ) : (
            posts?.map((post) => (
              <article key={post.author + post.role} className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:border-brand-500">
                <div className="flex gap-4">
                  <img className="h-14 w-14 rounded-full object-cover" src={post.avatar} alt={post.author} />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-white">{post.author}</p>
                      <span className={classNames('rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em]', post.membership === 'Privilege' ? 'bg-amber-300/15 text-amber-300' : post.membership === 'Prime' ? 'bg-violet-300/15 text-violet-300' : 'bg-slate-800 text-slate-300')}>
                        {post.membership}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{post.role}</p>
                  </div>
                </div>
                <p className={classNames('mt-5 text-sm leading-7', post.locked ? 'text-slate-500 blur-sm' : 'text-slate-300')}>
                  {post.content}
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button className="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-2 text-sm text-slate-300 transition hover:border-brand-500">♥ {post.likes}</button>
                  <button
                    type="button"
                    onClick={openJoinModal}
                    className="rounded-2xl border border-slate-800 px-4 py-2 text-sm text-slate-300 transition hover:border-brand-500"
                  >
                    💬 Reply (members only)
                  </button>
                </div>
              </article>
            ))
          )}
        </div>

        <aside className="hidden flex-col gap-4 lg:flex">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-400">Your status</p>
            <span className="mt-4 inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm text-slate-300">Guest / Free</span>
            <p className="mt-4 text-sm text-slate-400">Viewing only. Join to post and participate.</p>
            <button
              type="button"
              onClick={openJoinModal}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
            >
              Join Now
            </button>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
            <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-400">This week</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-400">
              <div>Mon · Casting Board</div>
              <div>Thu · Baba ki Baatein</div>
              <div>Sat · Spotlight Saturday</div>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
            <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-400">Active now</h3>
            <div className="mt-4 space-y-3">
              {['Riya S.', 'Karan D.', 'Meera J.'].map((name, index) => (
                <div key={name} className="flex items-center gap-3 text-sm text-slate-300">
                  <img className="h-7 w-7 rounded-full object-cover" src={`https://i.pravatar.cc/150?img=${47 + index * 20}`} alt={name} />
                  <span>{name}</span>
                  <span className="ml-auto h-2 w-2 rounded-full bg-emerald-500" />
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
