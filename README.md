# Personal Fitness App v5

Version 5 moves the app from browser-only storage to Supabase cloud sync.

## What changed

- Email magic-link sign-in
- Supabase-backed weekly plans, completed workouts, weight and waist measurements
- Data sync across devices
- Automatic one-time migration of existing v4/v3/v2 browser data when the cloud database is empty
- 30-day average weight goal remains 125 lb by default
- Sunday-to-Saturday weeks, editable plans, planned run distance, actual run distance, and week cloning remain intact
- Data model remains ready for Strava integration

## Vercel environment variables

These are the variable names expected in Vercel:

- `SUPABASE_URL_PUBLIC`
- `SUPABASE_PUBLISHABLE`

`next.config.mjs` maps those values to the client-side Supabase configuration at build time.

## Supabase tables

This build expects the three tables already created in Supabase:

- `profiles`
- `planned_activities`
- `measurements`

Row Level Security must be enabled with policies that restrict rows to `auth.uid()`.

## Deploying this version over the existing GitHub/Vercel app

Copy the contents of this folder into the existing local Git repository for `personal-fitness-app`, replacing the old app files but leaving the hidden `.git` folder in place.

Then run:

```bash
git add .
git commit -m "Add Supabase cloud sync"
git push
```

Vercel should automatically deploy the pushed commit.

## First sign-in

Open the Vercel app and enter your email. Supabase will send a magic sign-in link. The first successful sign-in will automatically move any v4 data stored in that same browser into Supabase if the new cloud database is still empty.
