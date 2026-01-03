# Skinstric AI - Vite + React Project

A modern React application built with Vite for Skinstric AI skin analysis.

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

### Running the Project

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### Building for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
├── index.html              # Entry point
├── vite.config.js          # Vite configuration
├── package.json            # Dependencies and scripts
├── src/
│   ├── main.jsx           # React entry point
│   ├── App.jsx            # Main App component
│   ├── globals.css        # Global styles
│   ├── components/        # React components
│   │   ├── SiteHeader.jsx
│   │   ├── DiamondNav.jsx
│   │   ├── BackButton.jsx
│   │   └── BlinkingInput.jsx
│   ├── pages/             # Page components
│   │   ├── HomePage.jsx
│   │   ├── analysis/      # Analysis flow pages
│   │   └── SummaryPage.jsx
│   └── lib/               # Utilities
│       ├── api.js         # API calls
│       ├── storage.js     # LocalStorage helpers
│       └── validators.js  # Input validation
├── public/                # Static assets (images, icons)
└── dist/                  # Production build output
```

## Features

- ✅ Vite for fast development and optimized builds
- ✅ React 19 for modern UI components
- ✅ React Router for navigation
- ✅ LocalStorage for data persistence
- ✅ Image upload functionality
- ✅ Camera selfie capture
- ✅ API integration for AI analysis
- ✅ Responsive design
- ✅ Tailwind CSS for styling

## Pages

- `/` - Home/Landing page
- `/analysis/introduce` - Enter your name
- `/analysis/city` - Enter your city
- `/analysis/permissions` - Permissions explanation
- `/analysis/image` - Upload image
- `/analysis/selfie` - Camera selfie capture
- `/analysis/demographics` - AI demographics analysis
- `/summary` - Analysis summary

## API Endpoints

The project uses these external APIs:
- Phase 1: `https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseOne`
- Phase 2: `https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo`

## Notes

- All data is stored in browser localStorage
- Images are converted to base64 for API submission
- Camera access requires HTTPS or localhost
