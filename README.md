# 🍷 Wine Colle## Tech Stack

-   **Frontend**: React.js with Vite for fast development
-   **Database**: Supabase (PostgreSQL) for real-time, cloud-based storage
-   **Styling**: Tailwind CSS for responsive, modern design
-   **Icons**: Heroicons for consistent iconography
-   **Deployment**: Vercel for seamless hosting

## Getting Started

### Prerequisites

-   Node.js (v18 or higher recommended)
-   A Supabase projectodern, AI-coded web application for managing your personal wine collection. Built with React, Firebase, and Tailwind CSS for a clean, intuitive user experience.

## Features

-   **Persistent Data Storage**: Your wine collection is saved to Google Firestore, accessible from any device
-   **Add New Wines**: Easily add bottles to your collection with detailed information
-   **Stock Management**: Track and update bottle quantities with simple increment/decrement controls
-   **Wine Rating**: Rate your wines on a 1-5 star scale
-   **Search & Filter**: Find wines quickly with text search across all fields
-   **Smart Sorting**: Sort your collection by name, winery, vintage, rating, stock, and more
-   **Real-time Sync**: Changes are instantly synchronized across all your devices
-   **Responsive Design**: Beautiful, modern interface that works on desktop and mobile

## Tech Stack

-   **Frontend**: React.js with Vite for fast development
-   **Database**: Google Firestore for real-time, cloud-based storage
-   **Authentication**: Firebase Authentication (anonymous sign-in)
-   **Styling**: Tailwind CSS for responsive, modern design
-   **Icons**: Heroicons for consistent iconography

## Getting Started

### Prerequisites

-   Node.js (v18 or higher recommended)
-   A Firebase project with Firestore enabled

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
    - Copy `.env.local.example` to `.env.local` and add your Supabase credentials:
        ```
        VITE_SUPABASE_URL=your-supabase-url
        VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
        ```
    - Run the SQL schema in your Supabase SQL Editor (see `supabase-schema.sql`)

4. Start the development server:

    ```bash
    npm run dev
    ```

5. Open your browser and navigate to `http://localhost:5173`

## Configuration

### Firebase Setup

Replace the placeholder values in `src/firebase.js` with your actual Firebase configuration:

```javascript
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-app-id",
}
```

### Firestore Security Rules

Set up Firestore security rules to protect user data:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /artifacts/wine-app/users/{userId}/wines/{wineId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Available Scripts

-   `npm run dev` - Start development server
-   `npm run build` - Build for production
-   `npm run preview` - Preview production build
-   `npm run lint` - Run ESLint

## Data Model

Each wine in your collection has the following structure:

```json
{
    "name": "Wine Name",
    "winery": "Winery Name",
    "vintage": 2020,
    "varietal": "Cabernet Sauvignon",
    "location": "Napa Valley",
    "bottlesInStock": 3,
    "rating": 4,
    "createdAt": "2024-01-01T00:00:00Z"
}
```

## Contributing

This project was designed as an AI-coded application. Feel free to fork and customize it for your needs!

## License

MIT License - feel free to use this project as a starting point for your own wine collection app.
