import { motion } from 'framer-motion';
import { useUiStore } from '../store/uiStore';
import { useNavigate } from 'react-router-dom';
import { featureCards, heroStats, ritualCards, cityChapters, pricingPlans, tweets } from '../data/content';
import { SectionHeading } from '../components/SectionHeading';
import { classNames } from '../utils/classNames';

const sectionFade = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function HomePage() {
  const { openJoinModal } = useUiStore();
  const navigate = useNavigate();

  return (
    <div className="space-y-12 pt-8 lg:pt-10">
      <section className="relative isolate overflow-hidden rounded-b-[3rem] bg-slate-950 px-4 pb-20 pt-14 text-center sm:px-6 lg:px-8">
        <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-600/20 via-transparent to-transparent blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(232,101,58,0.12),transparent_55%)]" />
        <div className="relative mx-auto max-w-3xl py-12">
          <p className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand-200">
            <span className="h-2 w-2 rounded-full bg-brand-500" />
            By ATFA · Performing Arts As A Service
          </p>
          <h1 className="mt-8 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Where artists find <span className="text-brand-400">their tribe.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            A belonging ecosystem for every performing artist in India — and beyond. Not a group chat. Not a directory.
            A living ecosystem.
          </p>
          <div className="mx-auto mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate('/community')}
              className="inline-flex items-center justify-center rounded-full bg-brand-500 px-8 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-brand-600"
            >
              Explore the Tribe
            </button>
            <button
              type="button"
              onClick={() => document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900 px-8 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-800"
            >
              See Membership
            </button>
          </div>
          <div className="mt-14 grid gap-6 text-center sm:grid-cols-2 lg:grid-cols-4">
            {heroStats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-slate-800 bg-slate-900/80 px-6 py-5">
                <p className="text-3xl font-black text-white">{stat.value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.25em] text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-brand-800 px-4 py-4 text-white sm:px-6 lg:px-8">
        <div className="marquee">
          <div className="marquee-inner">
            {['Casting Board', 'Baba ki Baatein', 'Spotlight Saturday', 'Mentorship', 'Collaborate', 'Artiverse', 'City Chapters'].map((item) => (
              <span key={`${item}-1`} className="marquee-item text-xs uppercase tracking-[0.3em] text-white/90">
                {item}
              </span>
            ))}
            {['Casting Board', 'Baba ki Baatein', 'Spotlight Saturday', 'Mentorship', 'Collaborate', 'Artiverse', 'City Chapters'].map((item) => (
              <span key={`${item}-2`} className="marquee-item text-xs uppercase tracking-[0.3em] text-white/90">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-400">Every week, without fail</p>
          <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">The Tribe&apos;s rituals</h2>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {ritualCards.map((ritual) => (
            <motion.article
              key={ritual.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={sectionFade}
              className="rounded-3xl border border-slate-800 bg-slate-900 p-8 transition hover:bg-slate-800"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-brand-400">{ritual.frequency}</p>
              <h3 className="mt-4 text-xl font-bold text-white">{ritual.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">{ritual.description}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="bg-slate-950 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-400">What the world says</p>
          <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">Artists speak</h2>
          <p className="mt-3 text-sm leading-7 text-slate-400">Real voices. Real experiences. Real need for a Tribe.</p>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {tweets.map((tweet) => (
            <motion.article
              key={`${tweet.author}-${tweet.handle}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={sectionFade}
              className="rounded-3xl border border-slate-800 bg-slate-900 p-7 transition hover:border-brand-500"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-800 text-lg font-bold text-white">
                  {tweet.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{tweet.author}</p>
                  <p className="text-xs text-slate-500">{tweet.handle}</p>
                </div>
                <span className="ml-auto text-xl text-sky-400">𝕏</span>
              </div>
              <p className="mt-5 text-sm leading-7 text-slate-300">{tweet.content}</p>
              <p className="mt-5 flex gap-3 text-xs text-slate-500">{tweet.footer}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="bg-slate-950 px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why this is different"
          title="You are not just an artist. You are a tribe."
          center
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featureCards.map((feature) => (
            <motion.article
              key={feature.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={sectionFade}
              className="rounded-3xl border border-slate-800 bg-slate-900 p-7 transition hover:border-brand-500"
            >
              <div className="text-3xl">{feature.icon}</div>
              <h3 className="mt-5 text-lg font-bold text-white">{feature.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">{feature.description}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="bg-slate-950 px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="The Artiverse flywheel"
          title="How artists find the Tribe"
          center
        />
        <div className="mt-10 flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900 p-6 lg:flex-row lg:items-center lg:justify-center lg:gap-3">
          {[
            { label: 'Artiverse Event', detail: 'Attracts artists' },
            { label: 'TTT On-Ramp', detail: '₹499 on the night' },
            { label: 'Members Join', detail: 'Community grows' },
            { label: 'ATFA Programs', detail: 'Artists power projects' },
            { label: 'Revenue', detail: 'Funds next Artiverse' },
          ].map((step, index) => (
            <div key={step.label} className="flex items-center gap-2 rounded-3xl bg-slate-950 px-5 py-4 text-sm text-slate-300 shadow-sm sm:flex-1">
              <div className="min-w-[130px] text-white">
                <strong>{step.label}</strong>
              </div>
              <span className="text-slate-500">{step.detail}</span>
              {index < 4 ? <span className="text-brand-400">→</span> : null}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-950 px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="City chapters" title="Find your local tribe" center />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cityChapters.map((city) => (
            <article
              key={city.name}
              className="rounded-3xl border border-slate-800 bg-slate-900 p-6 text-center transition hover:border-brand-500"
            >
              <span
                className={classNames(
                  'mb-4 inline-flex h-3 w-3 rounded-full',
                  city.tone === 'active' ? 'bg-brand-500' : city.tone === 'coming' ? 'bg-emerald-500' : 'bg-slate-600'
                )}
              />
              <h3 className="text-base font-semibold text-white">{city.name}</h3>
              <p className="mt-2 text-sm text-slate-400">{city.status}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="pricing-section" className="bg-slate-950 px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Membership"
          title="Choose your place in the Tribe"
          description="Browse everything for free. Pay to participate, collaborate, and grow."
          center
        />
        <div className="mt-10 grid gap-4 xl:grid-cols-3">
          {pricingPlans.map((plan) => (
            <article
              key={plan.name}
              className={classNames(
                'rounded-3xl border p-7 shadow-sm transition',
                plan.flavor === 'gold' ? 'border-brand-500/50 bg-brand-500/10' : 'border-slate-800 bg-slate-900'
              )}
            >
              {plan.badge ? (
                <div className="mb-4 inline-flex rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.25em] text-slate-300">
                  {plan.badge}
                </div>
              ) : null}
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">{plan.tier}</p>
              <div className="mt-4 flex items-end gap-2">
                <p className="text-4xl font-bold text-white">{plan.price}</p>
                <span className="pb-1 text-sm text-slate-400">/ {plan.cadence}</span>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-400">{plan.description}</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-400">
                {plan.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3">
                    <span className="mt-1 text-brand-500">✓</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={openJoinModal}
                className={classNames(
                  'mt-8 w-full rounded-2xl px-4 py-3 text-sm font-semibold transition',
                  plan.flavor === 'success' ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400' :
                    plan.flavor === 'gold' ? 'bg-amber-400 text-slate-950 hover:bg-amber-300' :
                    plan.flavor === 'primary' ? 'bg-brand-500 text-white hover:bg-brand-600' :
                    'bg-slate-800 text-slate-200 hover:bg-slate-700'
                )}
              >
                {plan.buttonText}
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
