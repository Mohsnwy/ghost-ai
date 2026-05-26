# Progress Tracker

Update this file after every meaningful implementation
change.

## Current Phase

- Feature 03 complete pending manual auth flow check

## Current Goal

- Manual browser verification of Clerk sign-in/sign-up flows.

## Completed

- Design system setup with shadcn/ui and components (Button, Card, Dialog, Input, Tabs, Textarea, ScrollArea)
- Installed lucide-react
- Created lib/utils.ts with cn() helper
- Configured dark theme
- Feature 02 editor chrome:
  - Added `components/editor/editor-navbar.tsx`
  - Added `components/editor/project-sidebar.tsx`
  - Confirmed dialog pattern supports title, description,
    and footer actions with global color tokens
- Feature 03 auth:
  - Installed `@clerk/ui`
  - Added shared Clerk dark appearance using app CSS variables
  - Wrapped root layout with `ClerkProvider`
  - Added `/sign-in` and `/sign-up` catch-all Clerk pages
  - Added protected-first root `proxy.ts` with public auth routes
  - Updated `/` to redirect authenticated users to `/editor`
    and unauthenticated users to sign-in
  - Added Clerk `UserButton` to the editor navbar
  - Added minimal protected `/editor` shell using existing editor chrome
  - Updated auth pages to a screenshot-aligned 50/50 desktop layout
    with a distinct left product panel and Clerk forms using app font
    and color tokens

## In Progress

- Manual browser verification of live Clerk auth flow and responsive
  auth page layout.

## Next Up

- Continue with the next feature spec after manual auth flow
  verification.

## Open Questions

- `.env.local` currently contains Clerk publishable and secret keys,
  but does not define `NEXT_PUBLIC_CLERK_SIGN_IN_URL` or
  `NEXT_PUBLIC_CLERK_SIGN_UP_URL`. Implementation uses those standard
  Clerk env vars when present and falls back to `/sign-in` and
  `/sign-up`, matching `context/feature-specs/03-auth.md`.

## Architecture Decisions

- [Decisions made that affect the system design or
  data model — include why the decision was made]

## Session Notes

- Attempted to begin Feature 02 on 2026-05-24, but
  `context/feature-specs/02-editor.md` was 0 bytes. No editor
  implementation was started to avoid inventing undocumented
  behavior.
- Feature 02 spec is now available and scoped to reusable editor
  chrome components only; no project data model or actual dialog
  flows should be introduced in this unit.
- `npm run lint` passed.
- `npm run build` passed after allowing network access for
  `next/font` Google Fonts fetches; the first sandboxed attempt
  failed only on font fetches.
- Started Feature 03 auth on 2026-05-26 from
  `context/feature-specs/03-auth.md`.
- Installed `@clerk/ui` as required by the auth spec.
- `npm run lint` passed with one warning from
  `.agents/skills/clerk-tanstack-patterns/templates/tanstack-basic-auth/src/routes/__root.tsx`,
  outside app source.
- `npm run build` passed after allowing network access for
  `next/font` Google Fonts fetches.
- Refined the auth page UI on 2026-05-26 to better match the provided
  screenshot: equal desktop split, colored left panel, product feature
  rows, and Clerk appearance tied to `--font-sans`.
- `npm run lint` passed with the same warning from
  `.agents/skills/clerk-tanstack-patterns/templates/tanstack-basic-auth/src/routes/__root.tsx`,
  outside app source.
- `npm run build` passed after allowing network access for
  `next/font` Google Fonts fetches.
