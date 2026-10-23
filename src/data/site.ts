// Everything about the business lives here. Name, owner, phone, email and address
// come from his business card (brand/business-card.jpg). Every value marked
// PLACEHOLDER still needs his real answer.

export const site = {
  name: 'Dispatch Services',
  shortName: 'Dispatch',
  tagline: 'Papers served. Proof you can file.',
  phone: '303-317-3133',
  phoneHref: 'tel:+13033173133',
  smsHref: 'sms:+13033173133',
  email: 'contact@dispatchlegal.com',
  address: ['5910 South University Blvd. #C18-146', 'Greenwood Village, Colorado 80121'],
  hours: 'Office Mon–Fri 8–5 · Serves 7 days a week', // PLACEHOLDER
  region: 'Denver metro and the Front Range', // PLACEHOLDER
  owner: 'Brian Olds',
  // Shown in the footer while the site is a preview for him to look at.
  preview: true,
}

export type Service = {
  slug: string
  name: string
  blurb: string
  detail: string
}

// PLACEHOLDER: confirm his real list of services.
export const services: Service[] = [
  {
    slug: 'personal-service',
    name: 'Personal service',
    blurb: 'Summons, complaints, subpoenas and orders handed to the person named.',
    detail:
      'We hand the papers to the person named and record the time, place, GPS location and a description of who was served. Every attempt shows up in your portal the same day.',
  },
  {
    slug: 'substitute-service',
    name: 'Substitute service',
    blurb: 'Service on a qualified member of the household or workplace when the law allows it.',
    detail:
      'When the rules allow substitute service, we document who received the papers and their relationship to the person named, so the affidavit holds up.',
  },
  {
    slug: 'rush',
    name: 'Rush and same-day',
    blurb: 'Hearing tomorrow? Papers go out the day we get them.',
    detail:
      'Rush jobs are assigned the moment they arrive and attempted the same day when we receive them by noon. You see each attempt as it happens.',
  },
  {
    slug: 'skip-trace',
    name: 'Skip tracing',
    blurb: 'We find people who moved, went quiet, or gave a bad address.',
    detail:
      'Database searches and field checks to locate a current address, so a bad address does not stall your case.',
  },
  {
    slug: 'court-filing',
    name: 'Court filing and retrieval',
    blurb: 'Filing, pulling records and delivering certified copies.',
    detail:
      'We file with the clerk, pull records and deliver certified copies, and the receipts land in your portal.',
  },
  {
    slug: 'stakeout',
    name: 'Stakeouts and difficult serves',
    blurb: 'Evasive subjects, gated communities and after-hours attempts.',
    detail:
      'For people who avoid service, we plan timed attempts, wait on location and keep a detailed log of every visit.',
  },
]

// PLACEHOLDER: confirm the counties he covers.
export const counties = [
  'Denver',
  'Arapahoe',
  'Jefferson',
  'Adams',
  'Douglas',
  'Broomfield',
  'Boulder',
  'Weld',
  'Larimer',
  'El Paso',
]

export const steps = [
  {
    title: 'Send the papers',
    text: 'Upload them online or from your firm portal. Tell us the deadline and anything that helps us find the person.',
  },
  {
    title: 'We go to work',
    text: 'A server is assigned right away. Every attempt is logged with the time, GPS location and photos.',
  },
  {
    title: 'You get the proof',
    text: 'Once served, the signed affidavit of service is ready to download from your portal, with the invoice beside it.',
  },
]

export const faqs = [
  {
    q: 'How fast will my papers be served?',
    a: 'Standard jobs get a first attempt within 2–3 business days. Rush jobs are attempted the same day when we receive them by noon. Your portal shows every attempt as it happens.',
  },
  {
    q: 'How many attempts do you make?',
    a: 'Standard service includes up to three attempts at different times of day, including an evening or weekend attempt. If the address is bad, we tell you right away and can skip trace.',
  },
  {
    q: 'How do I get the affidavit of service?',
    a: 'Once the papers are served, the signed affidavit is uploaded to your portal and we email you that it is ready. The original can be mailed or filed for you.',
  },
  {
    q: 'Can my whole firm see our serves?',
    a: 'Yes. A firm account can have several logins, so attorneys and paralegals all see the same jobs, documents and invoices.',
  },
  {
    q: 'How do I pay?',
    a: 'Invoices arrive by email and sit in your portal. Pay by card or bank transfer online.',
  },
  {
    q: 'Is my information kept private?',
    a: 'Papers and photos are stored privately. Each firm sees only its own jobs, and each server sees only the jobs assigned to them.',
  },
]
