-- Phase 2 schema: persistent multi-device data + future Strava sync.
-- Run this in the Supabase SQL editor after creating a project and enabling Auth.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  maintenance_ceiling numeric(5,1) not null default 125.0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.planned_activities (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  activity_date date not null,
  title text not null,
  category text not null check (category in ('Run','Strength','Walk','Mobility','Other')),
  target text,
  target_miles numeric(6,2),
  status text not null default 'planned' check (status in ('planned','completed','skipped')),
  actual_miles numeric(6,2),
  actual_minutes integer,
  notes text,
  source text not null default 'manual' check (source in ('manual','strava')),
  strava_activity_id bigint,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.measurements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  measured_on date not null,
  weight numeric(5,1),
  waist numeric(5,1),
  created_at timestamptz not null default now(),
  unique (user_id, measured_on)
);

create table if not exists public.strava_tokens (
  user_id uuid primary key references auth.users(id) on delete cascade,
  athlete_id bigint,
  access_token text,
  refresh_token text,
  expires_at bigint,
  scope text,
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.planned_activities enable row level security;
alter table public.measurements enable row level security;
alter table public.strava_tokens enable row level security;

create policy "own profile" on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "own planned activities" on public.planned_activities for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own measurements" on public.measurements for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own strava tokens" on public.strava_tokens for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
