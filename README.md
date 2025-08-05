# Crimson Laravel Boilerplate

This is a boilerplate project for a Laravel application with a React frontend, using Inertia.js to connect the two. It comes with a pre-configured set of tools and features to get you started quickly.

## Features

- **Laravel 12**: The latest version of the most popular PHP framework.
- **React 19**: A modern JavaScript library for building user interfaces.
- **Inertia.js**: Makes it easy to build single-page apps using classic server-side routing.
- **TypeScript**: Adds static typing to JavaScript for more robust code.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Vite**: A blazing fast frontend build tool.
- **Authentication**: Pre-built authentication flows for login, registration, and password reset.
- **User Roles**: A simple role-based access control system with `admin` and `user` roles.
- **Data Tables**: A ready-to-use data table component with sorting, filtering, and pagination.
- **Dark Mode**: A toggleable dark mode theme for the application.
- **SSR (Server-Side Rendering)**: Support for server-side rendering for improved SEO and performance.

## Technologies Used

### Backend

- PHP 8.2
- Laravel 12
- Inertia.js
- Pest (for testing)

### Frontend

- React 19
- TypeScript
- Tailwind CSS
- Vite
- Radix UI (for accessible UI components)
- Headless UI (for unstyled, accessible UI components)
- Lucide Icons (for a beautiful icon set)

## Getting Started

### Prerequisites

- PHP >= 8.2
- Composer
- Node.js
- pnpm (or your preferred package manager)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/crimson-laravel-boilerplate.git
   cd crimson-laravel-boilerplate
   ```

2. **Install PHP dependencies:**

   ```bash
   composer install
   ```

3. **Install frontend dependencies:**

   ```bash
   pnpm install
   ```

4. **Set up your environment file:**

   ```bash
   cp .env.example .env
   ```

5. **Generate an application key:**

   ```bash
   php artisan key:generate
   ```

6. **Create a database file:**

   ```bash
   touch database/database.sqlite
   ```

7. **Run database migrations and seed the database:**

   ```bash
   php artisan migrate --seed
   ```

### Running the Application

To run the application in development mode, you can use the following command:

```bash
composer run dev
```

This will start the following processes concurrently:

- The Laravel development server (`php artisan serve`)
- The Vite development server (`npm run dev`)
- The Laravel queue worker (`php artisan queue:listen`)

You can then access the application at `http://localhost:8000`.

### Default User

The database seeder creates a default user with the following credentials:

- **Email**: `test@example.com`
- **Password**: `password`
- **Role**: `admin`

## Testing

To run the test suite, you can use the following command:

```bash
composer run test
```
