import { CheckCircle2, Paperclip, X } from 'lucide-react'
import { type ReactNode, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHeader } from '@/components/Layout'
import { site } from '@/data/site'
import {
  ACCEPTED_FILES,
  type AccountRequest,
  emptyAccountRequest,
  emptyServeRequest,
  MAX_FILE_MB,
  type ServeRequest,
  type SubmitResult,
  submitAccountRequest,
  submitServeRequest,
  validateAccountRequest,
  validateServeRequest,
} from '@/lib/intake'

function Field({
  label,
  name,
  error,
  hint,
  required,
  children,
}: {
  label: string
  name: string
  error?: string
  hint?: string
  required?: boolean
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
        {required && <span className="text-saddle"> *</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-sm text-muted">{hint}</p>}
      {error && (
        <p id={`${name}-error`} className="mt-1 text-sm font-medium text-[#a3361a]">
          {error}
        </p>
      )}
    </div>
  )
}

function Fieldset({ legend, children }: { legend: string; children: ReactNode }) {
  return (
    <fieldset className="rounded-xl border border-line bg-white p-5 sm:p-7">
      <legend className="px-2 font-display text-xl font-semibold text-ink">{legend}</legend>
      <div className="grid gap-5 sm:grid-cols-2">{children}</div>
    </fieldset>
  )
}

function Done({ result, children }: { result: Extract<SubmitResult, { ok: true }>; children: ReactNode }) {
  return (
    <section className="container-page max-w-2xl py-16">
      <div className="rounded-xl border border-line bg-white p-8 text-center">
        <CheckCircle2 className="mx-auto size-12 text-ok" />
        <h2 className="mt-4 text-3xl font-semibold">Got it. Thank you.</h2>
        <p className="mt-3 text-lg text-ink-soft">{children}</p>
        <p className="mt-5 inline-block rounded-md bg-parchment px-4 py-2 font-mono text-lg text-leather">
          Reference {result.reference}
        </p>
        {!result.stored && (
          <p className="mt-5 text-sm text-muted">
            Preview build: this form isn't connected yet, so nothing was sent. On the live site it goes straight to{' '}
            {site.owner}'s dashboard.
          </p>
        )}
        <div className="mt-8">
          <Link to="/" className="font-semibold text-leather hover:underline">
            Back to the home page
          </Link>
        </div>
      </div>
    </section>
  )
}

function useForm<T extends Record<string, string>>(initial: T) {
  const [values, setValues] = useState(initial)
  const bind = (name: keyof T & string) => ({
    id: name,
    name,
    value: values[name],
    onChange: (e: { target: { value: string } }) => setValues((v) => ({ ...v, [name]: e.target.value })),
  })
  return { values, bind }
}

export function RequestServe() {
  const { values, bind } = useForm<ServeRequest>(emptyServeRequest)
  const [files, setFiles] = useState<File[]>([])
  const [errors, setErrors] = useState<ReturnType<typeof validateServeRequest>>({})
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState<SubmitResult | null>(null)

  const inv = (k: keyof ServeRequest) =>
    errors[k] ? { 'aria-invalid': true as const, 'aria-describedby': `${k}-error` } : {}

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const found = validateServeRequest(values, files)
    setErrors(found)
    if (Object.keys(found).length) {
      document.getElementById(Object.keys(found)[0] === 'files' ? 'files' : Object.keys(found)[0])?.focus()
      return
    }
    setSending(true)
    setResult(await submitServeRequest(values, files))
    setSending(false)
  }

  if (result?.ok) {
    return (
      <>
        <PageHeader eyebrow="Request a serve" title="Request received" />
        <Done result={result}>
          We'll review the papers and reach out at {values.email} to confirm the job and any questions about the
          person being served.
        </Done>
      </>
    )
  }

  return (
    <>
      <PageHeader eyebrow="Request a serve" title="Send us the papers">
        Fill this out and attach the documents. We'll confirm the job and the fee before we start. Rush jobs received by
        noon are attempted the same day.
      </PageHeader>
      <form onSubmit={onSubmit} noValidate className="container-page max-w-4xl space-y-8 py-14">
        <Fieldset legend="About you">
          <Field label="Your name" name="requester_name" required error={errors.requester_name}>
            <input className="field" autoComplete="name" {...bind('requester_name')} {...inv('requester_name')} />
          </Field>
          <Field label="Firm or company" name="firm">
            <input className="field" autoComplete="organization" {...bind('firm')} />
          </Field>
          <Field label="Email" name="email" required error={errors.email}>
            <input className="field" type="email" autoComplete="email" {...bind('email')} {...inv('email')} />
          </Field>
          <Field label="Phone" name="phone">
            <input className="field" type="tel" autoComplete="tel" {...bind('phone')} />
          </Field>
        </Fieldset>

        <Fieldset legend="The case">
          <Field label="Case number" name="case_number" hint="If one has been assigned.">
            <input className="field" {...bind('case_number')} />
          </Field>
          <Field label="Court" name="court" hint="For example, Arapahoe County District Court.">
            <input className="field" {...bind('court')} />
          </Field>
        </Fieldset>

        <Fieldset legend="Who we're serving">
          <Field label="Full name of the person or business" name="subject_name" required error={errors.subject_name}>
            <input className="field" {...bind('subject_name')} {...inv('subject_name')} />
          </Field>
          <div className="sm:col-span-2">
            <Field
              label="Address(es) where they can be found"
              name="subject_address"
              required
              error={errors.subject_address}
              hint="Home, work, or both. One per line."
            >
              <textarea className="field min-h-24" {...bind('subject_address')} {...inv('subject_address')} />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field
              label="Description"
              name="subject_description"
              hint="Age, height, hair, vehicle, work hours, anything that helps us recognize and find them."
            >
              <textarea className="field min-h-24" {...bind('subject_description')} />
            </Field>
          </div>
        </Fieldset>

        <Fieldset legend="Timing and papers">
          <Field label="Must be served by" name="deadline">
            <input className="field" type="date" {...bind('deadline')} />
          </Field>
          <Field label="Speed" name="rush">
            <select className="field" {...bind('rush')}>
              <option value="standard">Standard (first attempt in 2–3 business days)</option>
              <option value="rush">Rush (first attempt within 24 hours)</option>
              <option value="same_day">Same day (received by noon)</option>
            </select>
          </Field>
          <div className="sm:col-span-2">
            <Field label="Documents to serve" name="files" error={errors.files} hint={`PDF, Word or photos, up to ${MAX_FILE_MB} MB each.`}>
              <label
                htmlFor="files"
                className="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-md border-2 border-dashed border-line bg-parchment/40 px-4 py-8 text-center hover:border-saddle"
              >
                <Paperclip className="size-6 text-saddle" />
                <span className="font-semibold text-ink">Choose files</span>
                <span className="text-sm text-muted">or take a photo of the papers on your phone</span>
              </label>
              <input
                id="files"
                type="file"
                multiple
                accept={ACCEPTED_FILES}
                className="sr-only"
                onChange={(e) => {
                  const picked = Array.from(e.target.files ?? [])
                  setFiles((f) => [...f, ...picked].slice(0, 10))
                  e.target.value = ''
                }}
              />
              {files.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {files.map((f, i) => (
                    <li key={`${f.name}-${i}`} className="flex items-center justify-between gap-3 rounded-md border border-line bg-white px-3 py-2 text-sm">
                      <span className="truncate">{f.name}</span>
                      <button
                        type="button"
                        className="shrink-0 rounded p-1 text-muted hover:text-ink"
                        onClick={() => setFiles((all) => all.filter((_, j) => j !== i))}
                      >
                        <X className="size-4" />
                        <span className="sr-only">Remove {f.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Anything else we should know" name="notes" hint="Gate codes, dogs, safety concerns, special instructions.">
              <textarea className="field min-h-24" {...bind('notes')} />
            </Field>
          </div>
        </Fieldset>

        {result && !result.ok && <p className="rounded-md bg-[#a3361a]/10 p-4 font-medium text-[#a3361a]">{result.message}</p>}

        <div className="flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            Papers are stored privately and only {site.name} can open them.
          </p>
          <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={sending}>
            {sending ? 'Sending…' : 'Send request'}
          </button>
        </div>
      </form>
    </>
  )
}

export function OpenAccount() {
  const { values, bind } = useForm<AccountRequest>(emptyAccountRequest)
  const [errors, setErrors] = useState<ReturnType<typeof validateAccountRequest>>({})
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState<SubmitResult | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const found = validateAccountRequest(values)
    setErrors(found)
    if (Object.keys(found).length) {
      document.getElementById(Object.keys(found)[0])?.focus()
      return
    }
    setSending(true)
    setResult(await submitAccountRequest(values))
    setSending(false)
  }

  if (result?.ok) {
    return (
      <>
        <PageHeader eyebrow="Firm account" title="Request received" />
        <Done result={result}>
          {site.owner} will set up {values.firm}'s account and email {values.email} a link to sign in, usually within one
          business day.
        </Done>
      </>
    )
  }

  const inv = (k: keyof AccountRequest) =>
    errors[k] ? { 'aria-invalid': true as const, 'aria-describedby': `${k}-error` } : {}

  return (
    <>
      <PageHeader eyebrow="Firm account" title="Open a firm account">
        One account for your whole firm: send papers, track serves, download affidavits and pay invoices online. Free to
        set up.
      </PageHeader>
      <form onSubmit={onSubmit} noValidate className="container-page max-w-4xl space-y-8 py-14">
        <Fieldset legend="Your firm">
          <Field label="Firm or company name" name="firm" required error={errors.firm}>
            <input className="field" autoComplete="organization" {...bind('firm')} {...inv('firm')} />
          </Field>
          <Field label="Main contact" name="contact_name" required error={errors.contact_name}>
            <input className="field" autoComplete="name" {...bind('contact_name')} {...inv('contact_name')} />
          </Field>
          <Field label="Email" name="email" required error={errors.email} hint="This person gets the first login.">
            <input className="field" type="email" autoComplete="email" {...bind('email')} {...inv('email')} />
          </Field>
          <Field label="Phone" name="phone">
            <input className="field" type="tel" autoComplete="tel" {...bind('phone')} />
          </Field>
          <Field label="Billing email" name="billing_email" error={errors.billing_email} hint="Where invoices should go, if different.">
            <input className="field" type="email" {...bind('billing_email')} {...inv('billing_email')} />
          </Field>
          <Field label="Serves per month, roughly" name="monthly_volume">
            <select className="field" {...bind('monthly_volume')}>
              <option value="">Choose one</option>
              <option>1–5</option>
              <option>6–20</option>
              <option>21–50</option>
              <option>More than 50</option>
            </select>
          </Field>
          <div className="sm:col-span-2">
            <Field label="Who else at the firm needs a login?" name="notes" hint="Names and emails, one per line.">
              <textarea className="field min-h-24" {...bind('notes')} />
            </Field>
          </div>
        </Fieldset>
        {result && !result.ok && <p className="rounded-md bg-[#a3361a]/10 p-4 font-medium text-[#a3361a]">{result.message}</p>}
        <div className="flex justify-end">
          <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={sending}>
            {sending ? 'Sending…' : 'Request account'}
          </button>
        </div>
      </form>
    </>
  )
}
