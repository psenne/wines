<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Wine Collection App - Copilot Instructions

This is a React-based wine collection management application with the following technology stack:

## Tech Stack

-   **Frontend**: React.js with Vite for fast development and optimized builds
-   **Database**: Supabase PostgreSQL for real-time, persistent data storage
-   **Authentication**: Clerk for secure Google authentication
-   **Styling**: Tailwind CSS for modern, responsive design
-   **Icons**: Heroicons for consistent iconography
-   **Deployment**: Vercel with native Supabase integration

## Project Structure

-   `src/supabase.js` - Supabase client configuration and initialization
-   `src/useClerkAuth.js` - Clerk authentication hook
-   `src/supabaseWineService.js` - Supabase database operations for wine CRUD
-   `src/components/` - React components for the UI
-   `src/components/ProtectedAction.jsx` - Component wrapper for authenticated-only actions
-   `supabase-schema.sql` - Database schema for Supabase initialization

## Key Features

-   Add new wines to the collection
-   Update wine stock levels (increment/decrement)
-   Rate wines on a 1-5 star scale
-   Filter wines by text search
-   Sort wines by various attributes
-   Real-time data synchronization with Supabase subscriptions
-   Responsive design optimized for all devices

## Database Schema

Wine records in the PostgreSQL `wines` table have the following structure:

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

## Environment Variables

Required environment variables for Supabase connection:

-   `VITE_SUPABASE_URL` - Your Supabase project URL
-   `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous public key

## Real-time Features

-   Real-time subscriptions using Supabase channels
-   Automatic UI updates when data changes
-   Live synchronization across multiple browser tabs/users

## Code Style Guidelines

-   Use functional components with hooks
-   Follow React best practices for state management
-   Use Tailwind CSS classes for styling
-   Use Heroicons for consistent iconography
-   Implement proper error handling for Supabase operations
-   Use async/await for asynchronous operations
-   Transform database snake_case to camelCase for JavaScript objects

## Deployment

-   Deployed on Vercel at: https://wineapp-ra6bz4143-psennes-projects.vercel.app
-   Environment variables configured in Vercel dashboard
-   Automatic deployments on git push
