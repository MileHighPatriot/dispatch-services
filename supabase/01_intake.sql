-- Dispatch Services, stage 1: public requests from the website.
-- Run once in the Supabase SQL editor. Safe to run again.
--
-- Anyone visiting the site can ADD a request and upload papers with it.
-- Nobody can read requests or files without being signed in as the owner
-- (that read policy arrives with the portal in stage 2).

create table if not exists public.intake_requests (
  id uuid primary key,
  kind text not null check (kind in ('serve', 'account')),
  payload jsonb not null,
  file_paths text[] not null default '{}',
  status text not null default 'new' check (status in ('new', 'accepted', 'declined')),
  created_at timestamptz not null default now()
);

alter table public.intake_requests enable row level security;

drop policy if exists "public can send requests" on public.intake_requests;
create policy "public can send requests" on public.intake_requests
  for insert to anon, authenticated
  with check (status = 'new' and octet_length(payload::text) < 20000 and cardinality(file_paths) <= 10);

-- Private bucket for papers sent with a request: 20 MB per file, documents and photos only.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'intake', 'intake', false, 20971520,
  array[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg', 'image/png', 'image/heic'
  ]
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "public can upload request papers" on storage.objects;
create policy "public can upload request papers" on storage.objects
  for insert to anon, authenticated
  with check (bucket_id = 'intake');
