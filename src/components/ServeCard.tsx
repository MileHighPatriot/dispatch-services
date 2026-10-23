import { Camera, CheckCircle2, Clock, FileText, MapPin } from 'lucide-react'

// A sample job as a law firm sees it in the portal. Fake data, for the homepage.
const attempts = [
  { when: 'Tue 6:42 PM', result: 'No answer', note: 'Lights on, no response. Car in driveway.', gps: '39.6133, -104.9876', photo: true },
  { when: 'Wed 7:15 AM', result: 'Served personally', note: 'Male, 40s, 5\'10", brown hair. Confirmed name.', gps: '39.6133, -104.9876', photo: true, served: true },
]

export function ServeCard() {
  return (
    <div className="relative rounded-xl border border-line bg-white shadow-[0_30px_60px_-30px_rgb(74_35_11/0.45)]">
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5">
        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted">Case 2026CV31847 · Arapahoe</p>
          <p className="font-display text-lg font-semibold text-ink">Smith v. Doe — Summons &amp; Complaint</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-ok/10 px-2.5 py-1 text-xs font-semibold text-ok">
          <CheckCircle2 className="size-3.5" /> Served
        </span>
      </div>
      <ol className="space-y-0 px-5 py-4">
        {attempts.map((a, i) => (
          <li key={a.when} className="relative flex gap-3 pb-4 last:pb-0">
            {i < attempts.length - 1 && <span className="absolute left-[7px] top-5 h-full w-px bg-line" aria-hidden />}
            <span
              className={`relative mt-1.5 size-[15px] shrink-0 rounded-full border-2 ${a.served ? 'border-ok bg-ok' : 'border-brass bg-white'}`}
              aria-hidden
            />
            <div className="min-w-0 flex-1">
              <p className="flex flex-wrap items-baseline gap-x-2 text-sm">
                <span className="font-semibold text-ink">{a.result}</span>
                <span className="text-muted">{a.when}</span>
              </p>
              <p className="mt-0.5 text-sm text-ink-soft">{a.note}</p>
              <p className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="size-3.5" /> {a.gps}
                </span>
                {a.photo && (
                  <span className="inline-flex items-center gap-1">
                    <Camera className="size-3.5" /> Photo on file
                  </span>
                )}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-b-xl border-t border-line bg-parchment/60 px-5 py-3 text-sm">
        <span className="inline-flex items-center gap-1.5 font-medium text-leather">
          <FileText className="size-4" /> Affidavit of service ready
        </span>
        <span className="inline-flex items-center gap-1.5 text-muted">
          <Clock className="size-4" /> Served in 13 hours
        </span>
      </div>
    </div>
  )
}
