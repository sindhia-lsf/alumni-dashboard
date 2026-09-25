# Lightship Alumni Dashboard

A responsive alumni community dashboard for Lightship Foundation Bootcamp graduates. The experience keeps founder profiles, company progress, Lightship updates, practical resources, alumni discovery, and support requests in one professional workspace.

## Included experiences

- Shared split-screen login with member and Lightship admin access modes
- Three-step first-time alumni onboarding
- Personalized home dashboard with announcements, company snapshot, resources, and events
- Editable personal, company, and business metrics profile sections
- Searchable, categorized resources library
- Searchable Luminaries founder directory with LinkedIn discovery
- Office-hours, introduction, and general support request flow
- Responsive mobile navigation and persistent local demo data
- Lightship team overview with onboarding, request, and publishing metrics
- Attributed announcement and resource creation, scheduling, and archiving
- Meeting-request triage with viewed and scheduled states
- Sortable and filterable cohort reporting with complete founder records

## Administration workspace

Choose **Admin access** on the login page to enter the Lightship team workspace. The prototype includes prefilled staff credentials for demonstration. Admin routes cover the overview, meeting requests, announcement publishing, resource publishing, the cohort table, and individual founder records. Content and request actions are tagged with the acting administrator’s name and timestamp.

## Design direction

The interface uses the supplied navy, red, and soft-yellow palette with warm ivory surfaces. Editorial display typography is paired with compact, legible UI typography for a polished founder-community aesthetic.

All visual assets used by the interface are stored in this repository. The DM Sans and Instrument Serif font files and their licenses are under `client/public/fonts/`. The supplied color reference is preserved under `docs/design/palette-reference.png`. The product UI uses CSS shapes, gradients, and Lucide icon components rather than remote image assets.

## Development

```bash
pnpm install
pnpm dev
```

Quality checks:

```bash
pnpm check
pnpm test
pnpm build
```

## Prototype note

This version is an interactive product prototype. Profile updates and demo session state persist in the browser, while admin content and request state persists for the current page session. Production deployment should connect the existing full-stack scaffold to role-based authentication and the database before inviting alumni or Lightship staff.
