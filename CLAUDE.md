# Project: Sticker Trading App

## Stack

- Next.js 15 App Router + TypeScript
- Supabase (auth + database)
- CSS Modules + Tailwind CSS
- pnpm as package manager

## Architecture

### Folder structure

- `components/ui/` → atomic UI components, no business logic, only props
- `components/auth/` → auth-specific presentational components
- `components/stickers/` → sticker-specific presentational components
- `components/matches/` → match-specific presentational components
- `containers/auth/` → auth containers with business logic and Supabase calls
- `containers/stickers/` → sticker containers with business logic
- `containers/matches/` → match containers with business logic
- `assets/icons/` → custom brand SVG icons (Google, Apple, WhatsApp, Instagram)
- `lib/` → utilities and clients (supabase.ts)
- `lib/data/` → static JSON data (stickers.json, venezuela.json)

### Smart vs Dumb components

- `components/` → presentational only, receive props, no Supabase calls, reusable
- `containers/` → business logic, Supabase calls, global state, pass data to components

### Routing (Next.js App Router)

- `app/(auth)/` → public routes, no navbar (login, register, onboarding)
- `app/(app)/` → protected routes, with sidebar (desktop) and bottom nav (mobile)

## Component conventions

### File structure

Every component follows this structure:

```
ComponentName/
├── ComponentName.types.ts   → types and interfaces (source of truth)
├── ComponentName.tsx        → component, imports and re-exports types
└── ComponentName.module.css → scoped styles via CSS Modules
```

### Types

- Types live in `.types.ts`, never inline in the component file
- Component re-exports its types so consumers can import from the component directly:
  ```typescript
  export type { ComponentProps, ComponentVariant } from './Component.types';
  ```

### CSS

- All styles via CSS Modules, never inline styles
- Always consume design tokens from `globals.css` via CSS custom properties
- Never hardcode colors, spacing or typography values
- Class names in camelCase (e.g. `styles.cardWrapper`, `styles.colorGreen`)

### Naming

- Component files: PascalCase (`LoginForm.tsx`)
- CSS classes: camelCase (`styles.loginForm`)
- Types: PascalCase with descriptive suffix (`LoginFormProps`, `ButtonVariant`)
- Handlers: `handle` prefix (`handleSubmit`, `handleGoogleLogin`)

## Code rules

- All code, comments, variable names and types in English
- CSS Modules for component-specific styles
- Global design tokens via CSS custom properties from `app/globals.css`
- Never hardcode colors, always use CSS variables (e.g. `var(--color-green)`)
- Responsive via CSS only, never detect resolution with JavaScript
- Minimum touch target 44px on all interactive elements
- Use `lucide-react` for general icons
- Use `assets/icons/` only for brand icons (Google, Apple, WhatsApp, Instagram)

## UI Components available

All in `components/ui/`:

- `Button` → variants: primary, secondary, ghost, danger, icon-only | colors: default, green
- `Input` → types: text, email, password, search, tel | states: default, error, disabled
- `Checkbox` → accents: green, coral | variants: plain, card
- `Toggle` → variants: plain, card
- `SegmentedControl` → controlled, stateless
- `Typography` → variants: display, h1, h2, title, body-lg, body-sm, label, caption
- `Card` → accents: default, green, coral, yellow, purple | paddings: none, sm, md, lg

## Brand icons available

All in `assets/icons/`:

- `GoogleIcon` → multicolor Google G logo, size prop
- `AppleIcon` → Apple logo, size + color props
- `WhatsAppIcon` → WhatsApp logo, size + color props
- `InstagramIcon` → Instagram logo outline, size + color props

## Supabase

- Client: `@/lib/supabase`
- Auth: Google OAuth only (no Apple for now)
- OAuth callback: `app/auth/callback/route.ts` → redirects to `/repes`
- After login, middleware checks if profile is complete → redirects to `/onboarding` if not

## Database tables

- `profiles` → user_id, nombre, country_code, country_name, state_name, city_name, phone_prefix, phone_number, instagram
- `user_repeated_stickers` → user_id, sticker_id, quantity
- `user_missing_stickers` → user_id, sticker_id

## Responsive layout

- Mobile-first, CSS only, no JavaScript for resolution detection
- `app/(auth)/` pages → single column on mobile, two columns on desktop
- `app/(app)/` pages → bottom nav on mobile, sidebar on desktop
- Breakpoint: 768px

## Design tokens

All defined in `app/globals.css` as CSS custom properties:

- Colors: `--color-green`, `--color-coral`, `--color-yellow`, `--color-purple`, `--color-ink`, `--color-surface`, `--color-bg`, `--color-muted`
- Semantic states: `--color-success`, `--color-warning`, `--color-danger`, `--color-info`
- Typography: `--font-display` (Archivo), `--font-body` (Inter)
- Spacing: `--space-1` through `--space-24`
- Radius: `--radius-xs` through `--radius-full`
- Shadows: `--shadow-sm/md/lg`, `--shadow-green-md/lg`, `--shadow-coral-md/lg`, etc.
- Motion: `--duration-fast/base/slow`, `--ease-out`, `--ease-snap`
- Hit targets: `--hit-min` (44px), `--hit-cozy` (48px), `--hit-comfy` (56px)
