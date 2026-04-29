# Atmos Cast

A polished, mobile-first weather dashboard built with Next.js, TypeScript, Tailwind CSS, and Open-Meteo. The app is inspired by the elegance and information density of modern native weather apps while using original code, layout, and styling.

## Features

- City search powered by the Open-Meteo Geocoding API
- Current weather hero with temperature, condition, and daily high/low
- Horizontally scrollable hourly forecast for the next 24 hours
- 10-day forecast with min/max temperature ranges and conditions
- Detail cards for humidity, wind, feels like, precipitation, sunrise/sunset, and UV index
- Responsive glass-style interface with dynamic weather-aware backgrounds
- Loading, empty, and friendly error states

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Open-Meteo Forecast API
- Open-Meteo Geocoding API

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Build for production:

```bash
npm run build
```

## APIs Used

- [Open-Meteo Forecast API](https://open-meteo.com/en/docs)
- [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api)

## Future Improvements

- Save recent city searches locally
- Add automatic location detection with browser permission
- Add unit switching between Celsius and Fahrenheit
- Include air quality and severe weather alerts where available
- Add subtle animated weather backgrounds
