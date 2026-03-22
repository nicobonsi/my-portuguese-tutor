-- ============================================================
-- My Portuguese Tutor — Initial Schema
-- Migration: 001_initial_schema.sql
-- Run this in: Supabase Dashboard → SQL Editor
-- ============================================================


-- ============================================================
-- PROFILES
-- Public user profile (display name, avatar)
-- ============================================================
create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  avatar_color text not null default '#1a6b3c',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone"
  on public.profiles for select using (true);

create policy "Users can update their own profile"
  on public.profiles for update using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert with check (auth.uid() = id);


-- ============================================================
-- USER PROGRESS
-- Tracks lesson completion and scores per user
-- ============================================================
create type lesson_status as enum ('not_started', 'in_progress', 'complete');

create table public.user_progress (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users(id) on delete cascade,
  lesson_id        text not null,
  status           lesson_status not null default 'not_started',
  score            int check (score >= 0 and score <= 100),
  attempts         int not null default 0,
  last_practiced_at timestamptz,
  next_review_at   timestamptz,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  unique(user_id, lesson_id)
);

alter table public.user_progress enable row level security;

create policy "Users can manage their own progress"
  on public.user_progress for all using (auth.uid() = user_id);


-- ============================================================
-- VOCABULARY RETENTION
-- SM-2 spaced repetition per word per user
-- ============================================================
create table public.vocabulary_retention (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users(id) on delete cascade,
  word_id          text not null,
  ease_factor      float not null default 2.5,
  interval_days    int not null default 1,
  repetitions      int not null default 0,
  due_at           timestamptz not null default now(),
  last_reviewed_at timestamptz,
  created_at       timestamptz not null default now(),
  unique(user_id, word_id)
);

alter table public.vocabulary_retention enable row level security;

create policy "Users can manage their own vocabulary"
  on public.vocabulary_retention for all using (auth.uid() = user_id);


-- ============================================================
-- USER GAMIFICATION
-- XP, level, streak, badges per user
-- ============================================================
create table public.user_gamification (
  user_id                uuid primary key references auth.users(id) on delete cascade,
  xp_total               int not null default 0,
  level                  int not null default 1,
  streak_current         int not null default 0,
  streak_longest         int not null default 0,
  streak_freeze_available bool not null default false,
  last_active_date       date,
  badges                 text[] not null default '{}',
  updated_at             timestamptz not null default now()
);

alter table public.user_gamification enable row level security;

create policy "Users can view their own gamification data"
  on public.user_gamification for select using (auth.uid() = user_id);

create policy "Users can update their own gamification data"
  on public.user_gamification for update using (auth.uid() = user_id);

create policy "Users can insert their own gamification data"
  on public.user_gamification for insert with check (auth.uid() = user_id);


-- ============================================================
-- XP EVENTS
-- Log of every XP award (used for weekly leaderboard)
-- ============================================================
create table public.xp_events (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  amount     int not null,
  reason     text not null,
  earned_at  timestamptz not null default now()
);

alter table public.xp_events enable row level security;

create policy "Users can view their own XP events"
  on public.xp_events for select using (auth.uid() = user_id);

create policy "Users can insert their own XP events"
  on public.xp_events for insert with check (auth.uid() = user_id);


-- ============================================================
-- LEADERBOARD VIEWS
-- Public read — display name + XP only, no PII
-- ============================================================

-- All-time leaderboard
create or replace view public.leaderboard_alltime as
  select
    p.id as user_id,
    p.display_name,
    p.avatar_color,
    g.xp_total,
    g.level,
    g.streak_current,
    rank() over (order by g.xp_total desc) as rank
  from public.user_gamification g
  join public.profiles p on p.id = g.user_id
  order by g.xp_total desc;

-- Weekly leaderboard (resets Monday UTC)
create or replace view public.leaderboard_weekly as
  select
    p.id as user_id,
    p.display_name,
    p.avatar_color,
    coalesce(sum(e.amount), 0)::int as xp_weekly,
    g.level,
    g.streak_current,
    rank() over (order by coalesce(sum(e.amount), 0) desc) as rank
  from public.profiles p
  join public.user_gamification g on g.user_id = p.id
  left join public.xp_events e
    on e.user_id = p.id
    and e.earned_at >= date_trunc('week', now())
  group by p.id, p.display_name, p.avatar_color, g.level, g.streak_current
  order by xp_weekly desc;


-- ============================================================
-- AUTO-CREATE PROFILE + GAMIFICATION ROW ON SIGNUP
-- ============================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  );

  insert into public.user_gamification (user_id)
  values (new.id);

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- ============================================================
-- ENABLE REALTIME on user_gamification (for live leaderboard)
-- ============================================================
alter publication supabase_realtime add table public.user_gamification;
