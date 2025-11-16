# Storm Watch — Weather Dashboard

A responsive and modern real-time weather dashboard application with an intuitive interface to monitor weather conditions across various cities.

## Table of Contents

- [Key Features](#key-features)
- [Technologies Used](#technologies-used)
- [Installation & Setup](#installation--setup)
- [Usage Guide](#usage-guide)
- [Folder Structure](#folder-structure)
- [API Configuration](#api-configuration)
- [Development](#development)
- [Build & Deploy](#build--deploy)
- [Troubleshooting](#troubleshooting)

---

## Key Features

### 1. Real-Time City Search
   - Search for cities worldwide easily
   - Weather display updates automatically when city changes

### 2. Comprehensive Weather Information
   - Current Weather: Temperature, feels like, humidity, wind speed
   - 7-Day Forecast: Max/min temperature for each day
   - Air Quality Index (AQI): Safe/hazardous air status with visual indicator
   - Advanced Weather Metrics:
     - Air pressure
     - Visibility distance
     - UV index
     - Precipitation
     - Peak wind speed
     - Cloud coverage

### 3. Interactive Map
   - City location displayed on OpenStreetMap
   - Real-time map zoom and navigation
   - Location marker with popup information

### 4. Celsius/Fahrenheit Temperature Toggle
   - Fast and responsive temperature switching
   - Preferences saved per session

### 5. Responsive Design
   - Desktop (2xl): 4-column layout with full sidebars
   - Laptop (xl): Optimized layout with compact spacing
   - Tablet (md): 2-column with full scroll
   - Mobile (sm/base): Single column, fully scrollable
   - Glass morphism design with blur effects

---

## Technologies Used

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19.2.0 | UI Framework |
| TypeScript | 5.8.3 | Type Safety |
| Vite | 5.4.19 | Build Tool & Dev Server |
| Tailwind CSS | 3.4.17 | Styling & Responsive Design |
| shadcn/ui | - | UI Components Library |
| React Query | 5.83.0 | Data Fetching & Caching |
| Leaflet | 1.9.4 | Interactive Maps |
| React-Leaflet | 5.0.0 | React Wrapper for Leaflet |
| Axios | - | HTTP Client |
| Lucide-react | - | Icon Library

---

## Installation & Setup

### Prerequisites
- Node.js >= 16.x (Download)
- Bun (optional, for faster package management)
- Git (Download)

### Installation Steps

```bash
# 1. Clone repository
git clone https://github.com/Terpaksa56/weather-dashboard.git
cd storm-watch-dashboard-main

# 2. Install dependencies
npm install
# or if using bun
bun install

# 3. Configure API Key
# - Create .env.local file (or edit src/utils/api.ts)
# - Get free API Key from https://www.weatherapi.com/
# - Add key to configuration file (see API Configuration section)

# 4. Start development server
npm run dev
# or
bun run dev

# Server will run at http://localhost:5173
```

---

## Usage Guide

### User Interface

```
┌─────────────────────────────────────────┐
│  Storm Watch           Oklahoma City    │  <- Header + Toggle C/F
├──────────────────────┬──────────────────┤
│                      │                  │
│  SIDEBAR             │   MAIN CONTENT   │
│  ├─ Search Bar       │   ├─ Forecast    │
│  ├─ Current Weather  │   │   Panel      │
│  ├─ Air Quality      │   ├─ Weather     │
│  └─ Map              │   │   Metrics    │
│                      │   └─ Details     │
│                      │                  │
└──────────────────────┴──────────────────┘
```

### Search Feature

1. Click Search Input on the left sidebar at the top
2. Type city name (e.g., "Jakarta", "Tokyo", "London")
3. Press Enter or click search button
4. Weather will update automatically

### Reading Weather Data

#### Current Weather Card
- Main temperature in the center
- "Feels Like" temperature with difference
- Humidity and Wind Speed

#### Forecast Panel (Top Section)
- National weather background image
- Descriptive weather conditions
- Maximum temperature for today

#### Forecast Grid (Bottom Section)
- Next 7 days
- High (H) and Low (L) temperatures for each day

#### Air Quality Panel
- Visual bar showing AQI level
- Labels: "Safe" (green/yellow) or "Hazardous" (orange/red)
- AQI indicator list

#### Weather Metrics
- 6 cards with detailed weather data:
  - Pressure (mb)
  - Visibility (km)
  - UV Index (level)
  - Precipitation (mm)
  - Wind Gust (km/h)
  - Cloud Cover (%)

#### Weather Map
- City location marked with red marker
- Zoom in/out with mouse scroll
- Click marker for popup information

### Temperature Toggle
- Click the C/F toggle in the top right header
- All temperatures will change automatically
- Choice is saved during the active session

---

## Folder Structure

```
storm-watch-dashboard-main/
├── public/
│   └── robots.txt
├── src/
│   ├── assets/
│   │   └── storm-bg.jpg          # Background image for forecast panel
│   ├── components/
│   │   ├── AirQualityPanel.tsx    # Air quality card
│   │   ├── CurrentWeatherCard.tsx # Current temperature and conditions
│   │   ├── ForecastPanel.tsx      # 7-day forecast
│   │   ├── SearchBar.tsx          # City search input
│   │   ├── TemperatureToggle.tsx  # Toggle C/F
│   │   ├── WeatherMap.tsx         # Interactive map
│   │   ├── WeatherMetrics.tsx     # Detailed weather metrics
│   │   └── ui/                    # shadcn/ui components
│   ├── hooks/
│   │   └── use-toast.ts           # Toast notification hook
│   ├── lib/
│   │   └── utils.ts               # Utility functions
│   ├── pages/
│   │   ├── Index.tsx              # Main dashboard page
│   │   └── NotFound.tsx           # 404 page
│   ├── utils/
│   │   ├── api.ts                 # WeatherAPI integration
│   │   └── temperature.ts         # Temperature conversion
│   ├── App.tsx                    # App router & main component
│   ├── main.tsx                   # Entry point
│   └── index.css                  # Global styles
├── vite.config.ts                 # Vite configuration
├── tsconfig.json                  # TypeScript configuration
├── tailwind.config.ts             # Tailwind CSS config
├── postcss.config.js              # PostCSS config
├── package.json                   # Dependencies
├── bun.lockb                       # Bun lock file
└── README.md                      # Documentation
```

---

## API Configuration

### Getting an API Key

1. Visit WeatherAPI.com
2. Sign up for a free account (1M requests/month)
3. Copy API Key from dashboard

### Setup API Key

Option 1: Environment Variable (Recommended)

```bash
# Create .env.local file in project root
echo "VITE_WEATHER_API_KEY=your_api_key_here" > .env.local
```

Option 2: Direct Code Edit

Edit src/utils/api.ts:

```typescript
const API_KEY = 'your_api_key_here'; // Replace with your API key
```

### Testing API

```typescript
// src/utils/api.ts is automatically configured
// Verify by opening browser console after running npm run dev
```

---

## Development

### Available Commands

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build result
npm run preview

# Lint code with ESLint
npm run lint
```

### Development Workflow

1. Start server: npm run dev
2. Edit files in src/
3. Browser auto-refreshes when files change
4. Console shows errors/warnings

### Key Files for Development

| File | Purpose |
|------|---------|
| src/pages/Index.tsx | Main dashboard layout & logic |
| src/utils/api.ts | WeatherAPI integration |
| tailwind.config.ts | Custom Tailwind settings |
| vite.config.ts | Vite build configuration |

---

## Build & Deploy

### Build for Production

```bash
npm run build
# Output saved in 'dist/' folder
```

### Deploy to Platforms

Vercel (Recommended)
```bash
npm install -g vercel
vercel login
vercel
```

Netlify
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

GitHub Pages
```bash
# Update vite.config.ts base path
# Push to github
git push origin main
```

Self-hosted (VPS/Docker)
```bash
# Build
npm run build

# Serve dist folder with web server (nginx/apache)
# or use http-server
npm install -g http-server
http-server dist
```

---

## Troubleshooting

### Problem: "Map is not showing"
Solution:
```typescript
// Make sure Leaflet CSS is imported in WeatherMap.tsx
import 'leaflet/dist/leaflet.css';

// Restart dev server
npm run dev
```

### Problem: "API Key error / No data showing"
Solution:
1. Verify API key from WeatherAPI is valid
2. Check .env.local or api.ts
3. Open browser console (F12) to see error message
4. Restart server: npm run dev

### Problem: "Styling is broken / Tailwind not applying"
Solution:
```bash
# Rebuild Tailwind
npm run dev

# or clear cache
rm -rf node_modules .vite
npm install
npm run dev
```

### Problem: "Port 5173 already in use"
Solution:
```bash
# Use different port
npm run dev -- --port 3000

# or kill process using port 5173
# Windows: netstat -ano | findstr :5173
# Mac/Linux: lsof -i :5173
```

### Problem: "Responsive layout not working on mobile"
Solution:
- Open DevTools (F12)
- Click device toggle (Ctrl+Shift+M)
- Test at different breakpoints (sm/md/lg/xl/2xl)
- Check viewport meta tag in index.html

---

## Responsive Breakpoints

Dashboard is optimized for all screen sizes:

| Breakpoint | Size | Device | Layout |
|-----------|------|--------|--------|
| base | < 640px | Mobile Phone | Single column, scrollable |
| sm | 640px+ | Small Phone | Single column, scrollable |
| md | 768px+ | Tablet | 2 columns, scrollable |
| lg | 1024px+ | Laptop | 4 column grid, viewport fit |
| xl | 1280px+ | Laptop XL | 4 columns, compact spacing |
| 2xl | 1536px+ | Desktop | 4 columns, full spacing |

---

## Customization

### Changing Theme Colors

Edit src/index.css:

```css
@layer base {
  :root {
    --background: 210 40% 98%;
    --foreground: 210 40% 3.9%;
    /* Change HSL values as needed */
  }
}
```

### Adding New Component

```bash
# Use shadcn-cli
npx shadcn-ui@latest add <component-name>
```

### Changing Forecast Panel Background

Replace src/assets/storm-bg.jpg with a new image.

---

## Performance Tips

1. Caching: React Query handles caching automatically
2. Image Optimization: Use next-gen format (.webp)
3. Code Splitting: Vite handles automatically
4. Minification: Production build automatically minified

---

## Contributing

Want to contribute? Fork the repo and create a pull request!

```bash
git checkout -b feature/feature-name
# Make changes
git commit -m "feat: description of changes"
git push origin feature/feature-name
```

---

## License

MIT License - Feel free to use for personal or commercial projects

---

## Author

Created by: Terpaksa56
Repository: https://github.com/Terpaksa56/weather-dashboard

---

## Support

Have questions or issues?

1. Check GitHub Issues
2. Create a new issue with detailed error description
3. Include screenshots and environment info

---

## Resources

- React Documentation
- Tailwind CSS Docs
- Vite Guide
- WeatherAPI Docs
- Leaflet Documentation
