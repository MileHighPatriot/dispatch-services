import { ArrowRight, Building2, FileCheck2, MapPinned, ShieldCheck, Timer } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CtaBand } from '@/components/Layout'
import { Rider } from '@/components/Rider'
import { ServeCard } from '@/components/ServeCard'
import { counties, services, site, steps } from '@/data/site'

const proof = [
  { icon: MapPinned, title: 'GPS and photo on every attempt', text: 'Time, place and pictures logged from the field.' },
  { icon: Timer, title: 'Same-day rush', text: 'Papers in by noon are attempted that day.' },
  { icon: FileCheck2, title: 'Court-ready affidavits', text: 'Signed and ready to download the day you are served.' },
  { icon: ShieldCheck, title: 'Private by design', text: 'Each firm sees only its own jobs and papers.' },
]

export function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-parchment">
        <div className="ruled pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <Rider className="pointer-events-none absolute -left-24 bottom-[-18%] h-[85%] w-auto text-leather/[0.045]" />
        <div className="container-page relative grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:py-24">
          <div>
            <p className="eyebrow">Process serving · {site.region}</p>
            <h1 className="mt-4 text-[2.6rem] font-semibold leading-[1.05] sm:text-6xl">{site.tagline}</h1>
            <p className="mt-6 max-w-xl text-lg text-ink-soft">
              {site.name} serves summonses, subpoenas and court papers across the metro, and logs every attempt with
              GPS and photos. Your firm watches each serve in its own portal and downloads the affidavit the moment
              it's done.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/request" className="btn btn-primary">
                Request a serve <ArrowRight className="size-4" />
              </Link>
              <Link to="/open-account" className="btn btn-ghost">
                Open a firm account
              </Link>
            </div>
            <p className="mt-6 text-sm text-muted">
              Or call{' '}
              <a href={site.phoneHref} className="font-semibold text-ink underline decoration-brass underline-offset-4">
                {site.phone}
              </a>
            </p>
          </div>
          <div className="relative">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">What your firm sees</p>
            <ServeCard />
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper">
        <div className="container-page grid gap-px py-2 sm:grid-cols-2 lg:grid-cols-4">
          {proof.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-3 px-1 py-6 sm:px-4">
              <Icon className="mt-0.5 size-6 shrink-0 text-saddle" strokeWidth={1.6} />
              <div>
                <p className="font-semibold text-ink">{title}</p>
                <p className="mt-0.5 text-[0.95rem] text-muted">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Services</p>
            <h2 className="mt-3 text-4xl font-semibold">Every kind of serve, handled</h2>
          </div>
          <Link to="/services" className="font-semibold text-leather hover:underline">
            All services →
          </Link>
        </div>
        <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Link key={s.slug} to={`/services#${s.slug}`} className="group bg-white p-6 transition-colors hover:bg-parchment/50">
              <span className="font-display text-sm text-brass">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-2 text-xl font-semibold group-hover:text-leather">{s.name}</h3>
              <p className="mt-2 text-[0.95rem] text-muted">{s.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-night text-paper">
        <div className="container-page py-20">
          <p className="eyebrow !text-brass-soft">How it works</p>
          <h2 className="mt-3 text-4xl font-semibold text-paper">Three steps, and you can watch all of them</h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="border-t border-paper/15 pt-6">
                <span className="font-display text-5xl font-semibold text-brass">{i + 1}</span>
                <h3 className="mt-3 text-2xl font-semibold text-paper">{s.title}</h3>
                <p className="mt-2 text-paper/70">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-page grid gap-12 py-20 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow">For law firms</p>
          <h2 className="mt-3 text-4xl font-semibold">Your own portal. No more "any update?" calls.</h2>
          <p className="mt-5 text-lg text-ink-soft">
            Every attorney and paralegal at your firm gets a login. Send new papers, follow each attempt as it's
            logged, download affidavits and pay invoices in one place.
          </p>
          <ul className="mt-6 space-y-2.5 text-ink-soft">
            {[
              'Live status on every serve',
              'Attempt history with times and GPS',
              'Affidavits and receipts to download',
              'Invoices you can pay online',
              'Message us about any job',
            ].map((t) => (
              <li key={t} className="flex gap-2.5">
                <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brass" /> {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/open-account" className="btn btn-primary">
              <Building2 className="size-4" /> Open a firm account
            </Link>
            <Link to="/for-firms" className="btn btn-ghost">
              See the portal
            </Link>
          </div>
        </div>
        <div className="rounded-xl border border-line bg-parchment p-6 sm:p-8">
          <p className="eyebrow">Where we serve</p>
          <h3 className="mt-2 text-2xl font-semibold">{site.region}</h3>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2 text-ink-soft sm:grid-cols-3">
            {counties.map((c) => (
              <li key={c} className="border-b border-line pb-2">
                {c} County
              </li>
            ))}
          </ul>
          <Link to="/service-area" className="mt-5 inline-block font-semibold text-leather hover:underline">
            Outside these counties? Ask us →
          </Link>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
