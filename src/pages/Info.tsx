import { Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CtaBand, PageHeader } from '@/components/Layout'
import { ServeCard } from '@/components/ServeCard'
import { counties, faqs, services, site } from '@/data/site'

export function Services() {
  return (
    <>
      <PageHeader eyebrow="Services" title="Papers served right, and proof that holds up">
        From a single summons to a stack of subpoenas, every job gets a logged attempt history and a signed affidavit.
      </PageHeader>
      <section className="container-page py-16">
        <div className="divide-y divide-line border-y border-line">
          {services.map((s, i) => (
            <article key={s.slug} id={s.slug} className="grid scroll-mt-24 gap-3 py-10 md:grid-cols-[5rem_1fr_1.4fr]">
              <span className="font-display text-3xl text-brass">{String(i + 1).padStart(2, '0')}</span>
              <h2 className="text-2xl font-semibold">{s.name}</h2>
              <div>
                <p className="text-lg text-ink-soft">{s.detail}</p>
                <Link to="/request" className="mt-3 inline-block font-semibold text-leather hover:underline">
                  Request this →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  )
}

export function ServiceArea() {
  return (
    <>
      <PageHeader eyebrow="Service area" title={`Serving ${site.region}`}>
        Based in Greenwood Village, we cover the metro every day and travel farther when a case needs it.
      </PageHeader>
      <section className="container-page grid gap-12 py-16 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <h2 className="text-3xl font-semibold">Counties we cover</h2>
          <ul className="mt-6 grid grid-cols-2 gap-x-8 sm:grid-cols-3">
            {counties.map((c) => (
              <li key={c} className="border-b border-line py-3 text-lg text-ink-soft">
                {c} County
              </li>
            ))}
          </ul>
        </div>
        <aside className="h-fit rounded-xl border border-line bg-parchment p-6">
          <h2 className="text-2xl font-semibold">Somewhere else?</h2>
          <p className="mt-3 text-ink-soft">
            We serve outside these counties by arrangement, and work with trusted servers statewide when the job calls
            for it. Call or send the request and we'll quote it.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/request" className="btn btn-primary">
              Request a serve
            </Link>
            <a href={site.phoneHref} className="btn btn-ghost">
              {site.phone}
            </a>
          </div>
        </aside>
      </section>
      <CtaBand />
    </>
  )
}

export function ForFirms() {
  const features = [
    ['Your whole firm, one account', 'Attorneys, paralegals and staff each get a login and see the same jobs.'],
    ['Send papers in a minute', 'Upload documents and details from the portal. Your firm info fills itself in.'],
    ['Watch every attempt', 'Each attempt shows the time, result, GPS location and notes as soon as the server logs it.'],
    ['Affidavits on file', 'Download the signed affidavit of service the day it is done, and any time after.'],
    ['Invoices and online pay', 'See every invoice and pay by card or bank transfer. Receipts are kept for you.'],
    ['Message us on a job', 'Questions stay with the job they are about, so nothing gets lost in email.'],
  ]
  return (
    <>
      <PageHeader eyebrow="For law firms" title="Track every serve without picking up the phone">
        A free portal for every firm we work with. Here is what a finished serve looks like inside it.
      </PageHeader>
      <section className="container-page grid gap-12 py-16 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div className="lg:sticky lg:top-24">
          <ServeCard />
        </div>
        <ul className="grid gap-8 sm:grid-cols-2">
          {features.map(([title, text]) => (
            <li key={title} className="border-t-2 border-brass pt-4">
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="mt-2 text-ink-soft">{text}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="border-t border-line bg-parchment">
        <div className="container-page flex flex-col items-start gap-5 py-14 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold">Set up your firm</h2>
            <p className="mt-2 text-ink-soft">Tell us who you are. We'll create the account and email each person a login.</p>
          </div>
          <Link to="/open-account" className="btn btn-primary">
            Open a firm account
          </Link>
        </div>
      </section>
    </>
  )
}

export function About() {
  return (
    <>
      <PageHeader eyebrow="About" title="A local process server who answers the phone">
        {site.name} is run by {site.owner} out of Greenwood Village.
      </PageHeader>
      <section className="container-page grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5 text-lg text-ink-soft">
          {/* PLACEHOLDER: replace with Brian's own story, years serving and anything he wants clients to know. */}
          <p>
            Process serving is simple to describe and hard to do well. Papers have to reach the right person, at the
            right time, and the proof has to hold up when a judge reads it.
          </p>
          <p>
            Like the riders who carried the mail across the West, we take the job of delivering important papers
            seriously. Every attempt is logged with the time, place and photos, and every serve ends with an affidavit
            you can file.
          </p>
          <p>
            Firms work with us because we are easy to reach, honest about what happened at the door, and fast when the
            hearing is tomorrow.
          </p>
        </div>
        <aside className="h-fit rounded-xl border border-line bg-parchment p-6">
          <h2 className="text-2xl font-semibold">{site.owner}</h2>
          <p className="text-muted">Owner, {site.name}</p>
          <ul className="mt-5 space-y-3 text-ink-soft">
            <li className="flex gap-2.5">
              <Phone className="mt-1 size-4 shrink-0 text-saddle" />
              <a href={site.phoneHref} className="hover:text-leather">
                {site.phone}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Mail className="mt-1 size-4 shrink-0 text-saddle" />
              <a href={`mailto:${site.email}`} className="break-all hover:text-leather">
                {site.email}
              </a>
            </li>
            <li className="flex gap-2.5">
              <MapPin className="mt-1 size-4 shrink-0 text-saddle" />
              <span>
                {site.address.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </span>
            </li>
          </ul>
        </aside>
      </section>
      <CtaBand />
    </>
  )
}

export function Faq() {
  return (
    <>
      <PageHeader eyebrow="FAQ" title="Questions we hear a lot" />
      <section className="container-page max-w-3xl py-16">
        <div className="divide-y divide-line border-y border-line">
          {faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-display text-xl font-semibold text-ink [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="mt-1 text-brass transition-transform group-open:rotate-45" aria-hidden>
                  +
                </span>
              </summary>
              <p className="mt-3 text-lg text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-8 text-ink-soft">
          Didn't see yours?{' '}
          <Link to="/contact" className="font-semibold text-leather hover:underline">
            Ask us
          </Link>
          .
        </p>
      </section>
      <CtaBand />
    </>
  )
}

export function Contact() {
  return (
    <>
      <PageHeader eyebrow="Contact" title="Talk to a real person">
        {site.hours}
      </PageHeader>
      <section className="container-page grid gap-6 py-16 md:grid-cols-3">
        <a href={site.phoneHref} className="rounded-xl border border-line bg-white p-6 hover:border-saddle">
          <Phone className="size-6 text-saddle" />
          <h2 className="mt-4 text-xl font-semibold">Call or text</h2>
          <p className="mt-1 text-lg text-ink-soft">{site.phone}</p>
        </a>
        <a href={`mailto:${site.email}`} className="rounded-xl border border-line bg-white p-6 hover:border-saddle">
          <Mail className="size-6 text-saddle" />
          <h2 className="mt-4 text-xl font-semibold">Email</h2>
          <p className="mt-1 break-all text-lg text-ink-soft">{site.email}</p>
        </a>
        <div className="rounded-xl border border-line bg-white p-6">
          <MapPin className="size-6 text-saddle" />
          <h2 className="mt-4 text-xl font-semibold">Mail</h2>
          <p className="mt-1 text-ink-soft">
            {site.address.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </p>
        </div>
      </section>
      <section className="container-page pb-16">
        <div className="flex flex-col items-start gap-4 rounded-xl bg-parchment p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <p className="text-lg text-ink-soft">Ready to send papers? The request form takes about two minutes.</p>
          <Link to="/request" className="btn btn-primary">
            Request a serve
          </Link>
        </div>
      </section>
    </>
  )
}

export function NotFound() {
  return (
    <PageHeader eyebrow="404" title="That page didn't get delivered">
      <Link to="/" className="font-semibold text-leather hover:underline">
        Back to the home page →
      </Link>
    </PageHeader>
  )
}
