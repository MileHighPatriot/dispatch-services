import { Menu, MessageSquare, Phone, X } from 'lucide-react'
import { type ReactNode, useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { site } from '@/data/site'
import { Rider } from './Rider'

const nav = [
  { to: '/services', label: 'Services' },
  { to: '/service-area', label: 'Service area' },
  { to: '/for-firms', label: 'For law firms' },
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
]

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label={`${site.name} home`}>
      <Rider className={`h-8 w-auto ${light ? 'text-brass-soft' : 'text-leather'}`} />
      <span className="leading-none">
        <span className={`block font-display text-[1.35rem] font-semibold ${light ? 'text-paper' : 'text-leather'}`}>
          {site.name}
        </span>
        <span className={`block text-[0.65rem] font-semibold uppercase tracking-[0.2em] ${light ? 'text-brass-soft' : 'text-muted'}`}>
          Process serving · Colorado
        </span>
      </span>
    </Link>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `rounded px-3 py-2 text-[0.92rem] font-medium ${isActive ? 'text-leather' : 'text-ink-soft hover:text-leather'}`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <a href={site.phoneHref} className="text-[0.92rem] font-semibold text-ink hover:text-leather">
            {site.phone}
          </a>
          <Link to="/request" className="btn btn-primary !py-2.5">
            Request a serve
          </Link>
        </div>
        <button
          type="button"
          className="-mr-2 rounded p-2 text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
          <span className="sr-only">Menu</span>
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" className="border-t border-line bg-paper lg:hidden" aria-label="Main">
          <div className="container-page flex flex-col py-2">
            {nav.map((n) => (
              <NavLink key={n.to} to={n.to} className="border-b border-line/60 py-3 font-medium text-ink last:border-0">
                {n.label}
              </NavLink>
            ))}
            <Link to="/request" className="btn btn-primary my-3">
              Request a serve
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-night pb-24 text-paper/80 lg:pb-0">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-sm text-[0.95rem]">
            Process serving, skip tracing and court runs for law firms and individuals across {site.region}.
          </p>
        </div>
        <div className="text-[0.95rem]">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-brass-soft">Reach us</h2>
          <ul className="mt-3 space-y-1.5">
            <li>
              <a href={site.phoneHref} className="hover:text-paper">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-paper">
                {site.email}
              </a>
            </li>
            <li className="pt-2 text-paper/60">
              {site.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </li>
          </ul>
        </div>
        <div className="text-[0.95rem]">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-brass-soft">Get started</h2>
          <ul className="mt-3 space-y-1.5">
            <li>
              <Link to="/request" className="hover:text-paper">
                Request a serve
              </Link>
            </li>
            <li>
              <Link to="/open-account" className="hover:text-paper">
                Open a firm account
              </Link>
            </li>
            <li>
              <Link to="/for-firms" className="hover:text-paper">
                The client portal
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-paper">
                Questions
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-paper/10">
        <div className="container-page flex flex-col gap-1 py-5 text-xs text-paper/50 sm:flex-row sm:justify-between">
          <span>
            © {new Date().getFullYear()} {site.name}. {site.owner}, owner.
          </span>
          {site.preview && <span>Preview build · not yet live</span>}
        </div>
      </div>
    </footer>
  )
}

// Phones get a call / text / request bar pinned to the bottom.
function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-leather-deep bg-leather text-paper lg:hidden">
      <a href={site.phoneHref} className="flex flex-col items-center gap-0.5 py-2.5 text-xs font-semibold">
        <Phone className="size-5" /> Call
      </a>
      <a href={site.smsHref} className="flex flex-col items-center gap-0.5 border-x border-paper/15 py-2.5 text-xs font-semibold">
        <MessageSquare className="size-5" /> Text
      </a>
      <Link to="/request" className="flex flex-col items-center gap-0.5 bg-leather-deep py-2.5 text-xs font-semibold">
        <Rider className="h-5 w-auto" /> Send papers
      </Link>
    </div>
  )
}

export function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return (
    <div className="flex min-h-svh flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-2 focus:rounded focus:bg-paper focus:p-2">
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <MobileBar />
    </div>
  )
}

export function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-parchment">
      <Rider className="pointer-events-none absolute -right-10 bottom-[-12%] h-[115%] w-auto text-leather/[0.05]" />
      <div className="container-page relative py-14 sm:py-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold sm:text-5xl">{title}</h1>
        {children && <div className="mt-5 max-w-2xl text-lg text-ink-soft">{children}</div>}
      </div>
    </section>
  )
}

export function CtaBand() {
  return (
    <section className="bg-leather text-paper">
      <div className="container-page flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-semibold text-paper">Have papers that need serving?</h2>
          <p className="mt-2 text-paper/80">Send them now. Rush jobs received by noon are attempted the same day.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/request" className="btn btn-light">
            Request a serve
          </Link>
          <a href={site.phoneHref} className="btn border border-paper/30 text-paper hover:bg-paper/10">
            Call {site.phone}
          </a>
        </div>
      </div>
    </section>
  )
}
