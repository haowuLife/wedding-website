create extension if not exists pgcrypto;

create table if not exists public.guests (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 80),
  phone text not null,
  phone_normalized text not null unique,
  attending boolean not null,
  guest_count integer not null default 1 check (guest_count between 0 and 10),
  has_children boolean not null default false,
  need_parking boolean not null default false,
  dietary_restrictions text check (char_length(dietary_restrictions) <= 500),
  message text check (char_length(message) <= 1000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 80),
  message text not null check (char_length(message) between 1 and 500),
  is_approved boolean not null default false,
  is_hidden boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.photos (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 120),
  description text check (char_length(description) <= 500),
  image_url text not null,
  category text not null check (char_length(category) between 1 and 80),
  sort_order integer not null default 0,
  is_public boolean not null default false,
  collection text not null default 'gallery'
    check (collection in ('gallery', 'memories')),
  media_type text not null default 'image'
    check (media_type in ('image', 'video')),
  created_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.form_rate_limits (
  id uuid primary key default gen_random_uuid(),
  scope text not null,
  ip_hash text not null,
  request_count integer not null default 1,
  expires_at timestamptz not null,
  created_at timestamptz not null default now(),
  unique (scope, ip_hash)
);

create index if not exists guests_attending_idx
  on public.guests (attending, created_at desc);
create index if not exists messages_public_idx
  on public.messages (is_approved, is_hidden, created_at desc);
create index if not exists photos_collection_idx
  on public.photos (collection, is_public, sort_order);
create index if not exists rate_limits_expiry_idx
  on public.form_rate_limits (expires_at);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists guests_set_updated_at on public.guests;
create trigger guests_set_updated_at
before update on public.guests
for each row execute function public.set_updated_at();

drop trigger if exists settings_set_updated_at on public.site_settings;
create trigger settings_set_updated_at
before update on public.site_settings
for each row execute function public.set_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false);
$$;

create or replace function public.consume_form_rate_limit(
  p_scope text,
  p_ip_hash text,
  p_limit integer,
  p_window_seconds integer
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_record public.form_rate_limits%rowtype;
begin
  delete from public.form_rate_limits where expires_at <= now();

  select * into current_record
  from public.form_rate_limits
  where scope = p_scope and ip_hash = p_ip_hash
  for update;

  if not found then
    insert into public.form_rate_limits (
      scope, ip_hash, request_count, expires_at
    ) values (
      p_scope,
      p_ip_hash,
      1,
      now() + make_interval(secs => p_window_seconds)
    );
    return true;
  end if;

  if current_record.request_count >= p_limit then
    return false;
  end if;

  update public.form_rate_limits
  set request_count = request_count + 1
  where id = current_record.id;
  return true;
end;
$$;

revoke all on function public.consume_form_rate_limit(text, text, integer, integer)
from public, anon, authenticated;
grant execute on function public.consume_form_rate_limit(text, text, integer, integer)
to service_role;

alter table public.guests enable row level security;
alter table public.messages enable row level security;
alter table public.photos enable row level security;
alter table public.site_settings enable row level security;
alter table public.form_rate_limits enable row level security;

create policy "admins manage guests"
on public.guests for all to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "admins manage messages"
on public.messages for all to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "admins manage photos"
on public.photos for all to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "admins manage settings"
on public.site_settings for all to authenticated
using (public.is_admin())
with check (public.is_admin());

insert into storage.buckets (id, name, public, file_size_limit)
values ('wedding-media', 'wedding-media', false, 15728640)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit;

create policy "admins read wedding media"
on storage.objects for select to authenticated
using (bucket_id = 'wedding-media' and public.is_admin());

create policy "admins upload wedding media"
on storage.objects for insert to authenticated
with check (bucket_id = 'wedding-media' and public.is_admin());

create policy "admins update wedding media"
on storage.objects for update to authenticated
using (bucket_id = 'wedding-media' and public.is_admin())
with check (bucket_id = 'wedding-media' and public.is_admin());

create policy "admins delete wedding media"
on storage.objects for delete to authenticated
using (bucket_id = 'wedding-media' and public.is_admin());

revoke all on public.guests from anon;
revoke all on public.messages from anon;
revoke all on public.photos from anon;
revoke all on public.site_settings from anon;
revoke all on public.form_rate_limits from anon, authenticated;
