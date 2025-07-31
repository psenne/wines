# 🍷 Wine Collection App

A modern, AI-coded web application for managing your personal wine collection. Built with React, Supabase, Clerk, and Tailwind CSS for a clean, intuitive user experience.

## Features

-   **Public Viewing**: Anyone can browse the wine collection without authentication
-   **Protected Actions**: Adding, editing, and deleting wines requires authentication via Clerk
-   **Google Authentication**: Secure sign-in with Google through Clerk
-   **Persistent Data Storage**: Your wine collection is saved to Supabase PostgreSQL
-   **Stock Management**: Track and update bottle quantities with simple increment/decrement controls
-   **Wine Rating**: Rate your wines on a 1-5 star scale
-   **Search & Filter**: Find wines quickly with text search across all fields
-   **Smart Sorting**: Sort your collection by name, winery, vintage, rating, stock, and more
-   **Real-time Sync**: Changes are instantly synchronized with Supabase subscriptions
-   **Responsive Design**: Beautiful, modern interface that works on desktop and mobile

## Tech Stack

-   **Frontend**: React.js with Vite for fast development
-   **Database**: Supabase PostgreSQL for real-time, persistent data storage
-   **Authentication**: Clerk for secure Google authentication
-   **Styling**: Tailwind CSS for responsive, modern design
-   **Icons**: Heroicons for consistent iconography
-   **Deployment**: Vercel with native Supabase integration

## Getting Started

### Prerequisites

-   Node.js (v18 or higher recommended)
-   A Supabase project
-   A Clerk application

### Installation

1. Clone the repository:

    ```bash
    git clone <your-repo-url>
    cd wine-collection-app
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Configure Supabase:

    - Create a new Supabase project at [Supabase](https://supabase.com)
    - Go to Settings > API to get your project URL and anon key
    - Run the SQL schema in your Supabase SQL Editor (see `supabase-schema.sql`)

4. Configure Clerk:

    - Create a new application at [Clerk](https://clerk.com)
    - Enable Google authentication in your Clerk dashboard
    - Get your publishable key from the API Keys section

5. Environment Variables:

    Copy `.env.local.example` to `.env.local` and add your credentials:

    ```env
    VITE_SUPABASE_URL=your-supabase-url
    VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
    VITE_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
    ```

6. Start the development server:

    ```bash
    npm run dev
    ```

7. Open your browser and navigate to `http://localhost:5173`

## Authentication Flow

-   **Public Access**: Users can view all wines in the collection without signing in
-   **Protected Actions**: To add new wines, update stock, change ratings, or delete wines, users must authenticate
-   **Sign In**: Click the "Sign In" button to authenticate via Google through Clerk
-   **User Management**: Manage users through your Clerk dashboard

## Available Scripts

-   `npm run dev` - Start development server
-   `npm run build` - Build for production
-   `npm run preview` - Preview production build
-   `npm run lint` - Run ESLint

## Database Schema

Wine records in the PostgreSQL `wines` table:

```sql
CREATE TABLE wines (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  winery TEXT NOT NULL,
  vintage INTEGER,
  varietal TEXT,
  location TEXT,
  bottles_in_stock INTEGER DEFAULT 0,
  rating INTEGER DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Deployment

This app is configured for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Add environment variables in the Vercel dashboard
3. Deploy automatically on git push

## Contributing

This project was designed as an AI-coded application. Feel free to fork and customize it for your needs!

## License

MIT License - feel free to use this project as a starting point for your own wine collection app.
