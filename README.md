# Crimson Laravel Boilerplate

Modern Laravel + React starter with Inertia.js, TypeScript, Tailwind CSS 4, and a prebuilt admin area. Includes auth, role-based access control, data tables, dark mode, and optional SSR.

## Features

- **Laravel 12** backend with **Inertia.js**
- **React 19** + **TypeScript** powered frontend
- **Tailwind CSS 4** + utility-first UI with Radix primitives and Headless UI
- **Auth flows**: login, register, email verification, password reset/confirm
- **Role-based access** via `role` middleware (e.g., `role:admin`)
- **Admin area**: dashboard, users CRUD scaffold, settings (profile, password, appearance)
- **Data tables** with sorting, filtering, pagination via `DataTableService`
- **Dark mode** with persisted appearance
- **SSR support** (Inertia SSR server + Vite SSR build)

## Tech Stack

- Backend: PHP ^8.2, Laravel ^12, Inertia, Ziggy, Pest
- Frontend: React 19, TypeScript, Vite 7, Tailwind 4, Radix UI, Headless UI, Lucide React
- Tooling: pnpm, ESLint, Prettier, Laravel Pint, GitHub Actions

## Quick Start

### Prerequisites

- PHP >= 8.2 and Composer
- Node.js 22
- pnpm 10.9+

### Install

```bash
git clone https://github.com/Alivan21/crimson-laravel-boilerplate.git
cd crimson-laravel-boilerplate

# PHP deps
composer install

# Frontend deps
pnpm install

# Environment
cp .env.example .env
php artisan key:generate

# Migrate & seed
php artisan migrate --seed
```

### Run (SPA)

```bash
composer run dev
```

Starts: Laravel server, queue worker, and Vite dev server. App: `http://localhost:8000`.

### Run (SSR)

```bash
composer run dev:ssr
```

Builds SSR bundle and starts Laravel + queue + logs + Inertia SSR server.

## Scripts

- Composer
  - `composer run dev` — serve API + queue + Vite
  - `composer run dev:ssr` — serve with Inertia SSR
  - `composer run test` — clear config and run tests
- pnpm
  - `pnpm run dev` — Vite dev server
  - `pnpm run build` — type-check + build client; SSR bundle via `pnpm run build:ssr`
  - `pnpm run format` / `pnpm run format:check`
  - `pnpm run lint`
  - `pnpm run types`

## Routes

- Public
  - `GET /` — Welcome
- Auth (guest)
  - `GET/POST /register`, `GET/POST /login`
  - `GET/POST /forgot-password`, `GET /reset-password/{token}`, `POST /reset-password`
- Authenticated
  - Email verification notices + actions
  - Confirm password, logout
- Admin (requires `auth`, `verified`, `role:admin`, `active`)
  - `GET /admin/dashboard`
  - Users: index/create/store/show/edit/update/destroy
  - Settings: profile (edit/update/delete), password (edit/update), appearance

## Default Seeded User

- Email: `test@example.com`
- Password: `password`
- Role: `admin`

## Linting & Formatting

- PHP: `vendor/bin/pint`
- Frontend format: `pnpm run format`
- Frontend lint: `pnpm run lint`

## Testing

```bash
composer run test
```

## Production Build

```bash
pnpm run build            # client build
# optional: build SSR too
pnpm run build:ssr        # client + SSR bundle
```

Then deploy as a standard Laravel app (configure `.env`, run `php artisan migrate --force`, serve via your PHP runtime). Start the Inertia SSR server if you need SSR.

## Continuous Integration

GitHub Actions run on pushes/PRs to `main`:

- Install PHP 8.4, Node 22, pnpm 10.9
- Install deps, generate Ziggy routes, build assets

Separate linter workflow runs Pint, Prettier, and ESLint on `develop` and `main`.

## Notes

- Default DB is PostgreSQL (see `config/database.php`). Use MySQL by updating `.env` and running migrations.
- Routes are available to TypeScript via Ziggy generation in CI.
