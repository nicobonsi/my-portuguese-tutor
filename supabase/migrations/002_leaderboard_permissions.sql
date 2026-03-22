-- ============================================================
-- Fix leaderboard view permissions
-- Views don't inherit RLS — need explicit grants
-- ============================================================

GRANT SELECT ON public.leaderboard_alltime TO authenticated, anon;
GRANT SELECT ON public.leaderboard_weekly TO authenticated, anon;

-- Also grant access to underlying tables needed by the views
GRANT SELECT ON public.profiles TO authenticated, anon;
