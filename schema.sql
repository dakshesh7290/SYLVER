-- Run this once in Supabase: SQL Editor -> New query -> paste -> Run

create table if not exists public.sync_docs (
  user_id    uuid    not null default auth.uid() references auth.users(id) on delete cascade,
  key        text    not null,
  data       jsonb,
  deleted    boolean not null default false,
  ts         bigint  not null default 0,
  server_ts  timestamptz not null default now(),
  primary key (user_id, key)
);

create or replace function public.sync_docs_touch() returns trigger
language plpgsql as $$
begin
  new.server_ts = now();
  return new;
end $$;

drop trigger if exists sync_docs_touch on public.sync_docs;
create trigger sync_docs_touch before insert or update on public.sync_docs
for each row execute function public.sync_docs_touch();

create index if not exists sync_docs_server_ts_idx on public.sync_docs (user_id, server_ts);

alter table public.sync_docs enable row level security;

drop policy if exists "own rows" on public.sync_docs;
create policy "own rows" on public.sync_docs
  for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());
