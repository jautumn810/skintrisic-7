# Skinstric AI - HTML/CSS/JavaScript Project

A simple HTML, CSS, and JavaScript website for Skinstric AI skin analysis.

## Getting Started

### Installation

No dependencies required! This project uses plain HTML, CSS, and JavaScript.

### Running the Project

1. Start the development server:
   ```bash
   npm run dev
   ```
   or
   ```bash
   npm start
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### Alternative: Using Python

If you prefer not to use Node.js, you can use Python's built-in server:

```bash
# Python 3
python -m http.server 3000

# Python 2
python -m SimpleHTTPServer 3000
```

Then open `http://localhost:3000` in your browser.

## Project Structure

```
├── index.html              # Home page
├── pages/                  # All page files
│   ├── introduce.html      # Name input page
│   ├── city.html           # City input page
│   ├── permissions.html    # Permissions page
│   ├── image.html          # Image upload page
│   ├── selfie.html         # Camera selfie page
│   └── demographics.html   # Demographics analysis page
├── css/
│   └── styles.css          # All styles
├── js/                     # JavaScript utilities
│   ├── storage.js          # LocalStorage helpers
│   ├── validators.js       # Input validation
│   ├── api.js              # API calls
│   └── router.js           # Navigation helpers
├── public/                 # Static assets (images, icons)
└── server.js               # Simple HTTP server (optional)
```

## Features

- ✅ Plain HTML/CSS/JavaScript (no frameworks)
- ✅ LocalStorage for data persistence
- ✅ Image upload functionality
- ✅ Camera selfie capture
- ✅ API integration for AI analysis
- ✅ Responsive design
- ✅ Simple HTTP server included

## Pages

- `/` - Home/Landing page
- `/pages/introduce.html` - Enter your name
- `/pages/city.html` - Enter your city
- `/pages/permissions.html` - Permissions explanation
- `/pages/image.html` - Upload image or take selfie
- `/pages/selfie.html` - Camera selfie capture
- `/pages/demographics.html` - AI demographics analysis

## API Endpoints

The project uses these external APIs:
- Phase 1: `https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseOne`
- Phase 2: `https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo`

## Notes

- All data is stored in browser localStorage
- Images are converted to base64 for API submission
- Camera access requires HTTPS or localhost
