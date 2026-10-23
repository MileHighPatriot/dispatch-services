import { supabase } from './supabase'

export type ServeRequest = {
  requester_name: string
  firm: string
  email: string
  phone: string
  case_number: string
  court: string
  subject_name: string
  subject_address: string
  subject_description: string
  deadline: string
  rush: 'standard' | 'rush' | 'same_day'
  notes: string
}

export type AccountRequest = {
  firm: string
  contact_name: string
  email: string
  phone: string
  billing_email: string
  monthly_volume: string
  notes: string
}

export const emptyServeRequest: ServeRequest = {
  requester_name: '',
  firm: '',
  email: '',
  phone: '',
  case_number: '',
  court: '',
  subject_name: '',
  subject_address: '',
  subject_description: '',
  deadline: '',
  rush: 'standard',
  notes: '',
}

export const emptyAccountRequest: AccountRequest = {
  firm: '',
  contact_name: '',
  email: '',
  phone: '',
  billing_email: '',
  monthly_volume: '',
  notes: '',
}

export const MAX_FILE_MB = 20
export const ACCEPTED_FILES = '.pdf,.doc,.docx,.jpg,.jpeg,.png,.heic'

type Errors<T> = Partial<Record<keyof T | 'files', string>>

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())

export function validateServeRequest(r: ServeRequest, files: File[] = []): Errors<ServeRequest> {
  const e: Errors<ServeRequest> = {}
  if (!r.requester_name.trim()) e.requester_name = 'Who should we contact about this serve?'
  if (!emailOk(r.email)) e.email = 'Enter an email we can send updates to.'
  if (!r.subject_name.trim()) e.subject_name = 'Who is being served?'
  if (!r.subject_address.trim()) e.subject_address = 'Where can we find them? A work address helps too.'
  const tooBig = files.find((f) => f.size > MAX_FILE_MB * 1024 * 1024)
  if (tooBig) e.files = `${tooBig.name} is over ${MAX_FILE_MB} MB.`
  return e
}

export function validateAccountRequest(r: AccountRequest): Errors<AccountRequest> {
  const e: Errors<AccountRequest> = {}
  if (!r.firm.trim()) e.firm = 'Enter the firm or company name.'
  if (!r.contact_name.trim()) e.contact_name = 'Who is the main contact?'
  if (!emailOk(r.email)) e.email = 'Enter a valid email.'
  if (r.billing_email.trim() && !emailOk(r.billing_email)) e.billing_email = 'Enter a valid billing email.'
  return e
}

export type SubmitResult = { ok: true; reference: string; stored: boolean } | { ok: false; message: string }

// A short reference the requester can quote on the phone.
const reference = (id: string) => `DS-${id.slice(0, 6).toUpperCase()}`

const safeName = (name: string) => name.replace(/[^\w.-]+/g, '_').slice(-120)

export async function submitServeRequest(r: ServeRequest, files: File[]): Promise<SubmitResult> {
  const id = crypto.randomUUID()
  if (!supabase) return { ok: true, reference: reference(id), stored: false }

  const paths: string[] = []
  for (const file of files) {
    const path = `${id}/${Date.now()}-${safeName(file.name)}`
    const { error } = await supabase.storage.from('intake').upload(path, file, { upsert: false })
    if (error) return { ok: false, message: `Couldn't upload ${file.name}. Please try again or email the papers.` }
    paths.push(path)
  }
  const { error } = await supabase.from('intake_requests').insert({
    id,
    kind: 'serve',
    payload: r,
    file_paths: paths,
  })
  if (error) return { ok: false, message: "Something went wrong sending your request. Please call us and we'll take it by phone." }
  return { ok: true, reference: reference(id), stored: true }
}

export async function submitAccountRequest(r: AccountRequest): Promise<SubmitResult> {
  const id = crypto.randomUUID()
  if (!supabase) return { ok: true, reference: reference(id), stored: false }
  const { error } = await supabase.from('intake_requests').insert({ id, kind: 'account', payload: r, file_paths: [] })
  if (error) return { ok: false, message: "Something went wrong sending your request. Please call us and we'll set it up by phone." }
  return { ok: true, reference: reference(id), stored: true }
}
