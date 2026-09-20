# Fitness Goals App — MVP v4

A personal weekly fitness planning dashboard built around **planned workouts → actual workouts**, plus weight and waist trend tracking.

## What's fixed in v4

- Fixed the current-week date range so it reads cleanly as `Sep 20–26, 2026` instead of Safari's odd `Sep 20–2026 (day: 26)` formatting
- Removed the redundant “plan first, then log against it” helper text
- Made the activity title in **Edit Plan** a fully controlled editable field
- The Edit Plan heading now updates live as you type a new title, so it is obvious the title is changing
- v3 browser data migrates automatically, preserving the week(s) you already entered and cloned

## Existing features

- Sunday-through-Saturday weeks
- Add, edit, move, skip, undo, or delete planned activities
- Dedicated planned and actual distance fields for runs
- Clone the viewed week's schedule into the next week
- Navigate backward and forward by week
- Log completed activities against the plan
- Record duration and notes
- Weekly KPI cards for plan completion, running miles, strength sessions, and weight trend
- Weight + waist check-ins
- 30-day average weight compared with a 125 lb maintenance ceiling
- Recent weight trend graphic
- Browser persistence with `localStorage`
- Responsive layout for laptop and phone
- Data model prepared for Strava-imported activities

## Run it locally

You need Node.js installed.

```bash
npm install
npm run dev
```

Then open the local address Next.js prints in Terminal, normally `http://localhost:3000`.

## Next phase

After the planning workflow feels right, the next major step is Supabase persistence/login so the same app and data are available on laptop and phone. Then Strava OAuth/import can be added on top of that.
