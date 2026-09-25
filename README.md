# Lightship Alumni Dashboard

A responsive alumni community dashboard for Lightship Foundation Bootcamp graduates. The experience keeps founder profiles, company progress, Lightship updates, practical resources, alumni discovery, and support requests in one professional workspace.

## Included experiences

- Split-screen member login with email/password and Google entry options
- Three-step first-time alumni onboarding
- Personalized home dashboard with announcements, company snapshot, resources, and events
- Editable personal, company, and business metrics profile sections
- Searchable, categorized resources library
- Searchable Luminaries founder directory with LinkedIn discovery
- Office-hours, introduction, and general support request flow
- Responsive mobile navigation and persistent local demo data

## Design direction

The interface uses the supplied navy, red, and soft-yellow palette with warm ivory surfaces. Editorial display typography is paired with compact, legible UI typography for a polished founder-community aesthetic.

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

This version is an interactive product prototype. Profile updates and demo session state persist in the browser. Production deployment should connect the existing full-stack scaffold to the preferred identity provider and database before inviting alumni.
