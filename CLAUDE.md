# Dispatch Services

Website and portal for Brian Olds' process serving business, Dispatch Services (Greenwood Village, CO). Brian is Kohlton's father-in-law. His last web developer kept his old site, so ownership matters: at go-live every account (domain, Supabase, Stripe, email) is in Brian's name, with Kohlton as a team member.

Plan: `~/.claude/plans/so-what-im-thinking-glittery-wand.md`. Business details come from his card (`brand/business-card.jpg`) and live in `src/data/site.ts`; anything marked PLACEHOLDER still needs his answer.

## Status
- Stage 1 (public site + request forms): built 2026-10-23. The forms run in preview mode (nothing stored) until `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` are set; `supabase/01_intake.sql` creates the table and private bucket.
- Next: stage 2 (auth, roles, owner job board, server portal).
- Preview: https://milehighpatriot.github.io/dispatch-services/
- Preview only. No domain or accounts in Brian's name until he says he wants the site.

## Commands
- `npm run dev` (http://127.0.0.1:4210), `npm run build`, `npm test`, `npm run preview` (port 4211)

## Rules
- No commit or push until Kohlton says "save". Each push to main redeploys the preview on GitHub Pages.
- The repo is public (2026-10-23, so Brian can see a preview link). Switch it back to private before the portal holds real cases.
- Demo data only during the preview. Never commit keys; the Supabase URL and anon key go in `.env.local`.
- The rider logo (`src/components/Rider.tsx`) was traced from the business card; a higher-resolution original from Brian would be better.
