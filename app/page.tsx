"use client";

import { useEffect, useMemo, useState } from "react";
import { CurrentWeatherCard } from "@/components/CurrentWeatherCard";
import { DailyForecast } from "@/components/DailyForecast";
import { HourlyForecast } from "@/components/HourlyForecast";
import { SearchBar } from "@/components/SearchBar";
import { WeatherDetailsGrid } from "@/components/WeatherDetailsGrid";
import { searchCities } from "@/lib/geocoding";
import { DEFAULT_LOCATION, getWeather } from "@/lib/weather";
import { getWeatherCodeMeta } from "@/lib/weatherCodes";
import type { GeocodingResult, WeatherLocation, WeatherSnapshot } from "@/types/weather";

function toWeatherLocation(city: GeocodingResult): WeatherLocation {
  return {
    name: city.name,
    admin1: city.admin1,
    country: city.country,
    latitude: city.latitude,
    longitude: city.longitude,
    timezone: city.timezone
  };
}

function getBackground(snapshot: WeatherSnapshot | null): string {
  const current = snapshot?.forecast.current;

  if (!current) {
    return "from-slate-950 via-slate-900 to-sky-950";
  }

  const accent = getWeatherCodeMeta(current.weather_code).accent;
  const isDay = Boolean(current.is_day);

  if (!isDay) return "from-slate-950 via-indigo-950 to-slate-900";
  if (accent === "clear") return "from-sky-950 via-blue-900 to-cyan-900";
  if (accent === "rain") return "from-slate-950 via-sky-950 to-teal-950";
  if (accent === "storm") return "from-zinc-950 via-slate-900 to-violet-950";
  if (accent === "snow") return "from-slate-950 via-cyan-950 to-slate-800";
  if (accent === "fog") return "from-slate-900 via-zinc-800 to-stone-900";
  return "from-slate-950 via-slate-900 to-sky-950";
}

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState<WeatherLocation>(DEFAULT_LOCATION);
  const [snapshot, setSnapshot] = useState<WeatherSnapshot | null>(null);
  const [isWeatherLoading, setIsWeatherLoading] = useState(true);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isCurrentRequest = true;

    async function loadWeather() {
      setIsWeatherLoading(true);
      setError("");

      try {
        const nextSnapshot = await getWeather(selectedLocation);
        if (isCurrentRequest) {
          setSnapshot(nextSnapshot);
        }
      } catch (loadError) {
        if (isCurrentRequest) {
          setError(loadError instanceof Error ? loadError.message : "Unable to load weather data.");
        }
      } finally {
        if (isCurrentRequest) {
          setIsWeatherLoading(false);
        }
      }
    }

    loadWeather();

    return () => {
      isCurrentRequest = false;
    };
  }, [selectedLocation]);

  const background = useMemo(() => getBackground(snapshot), [snapshot]);

  async function handleSearch(query: string) {
    setIsSearchLoading(true);
    try {
      return await searchCities(query);
    } finally {
      setIsSearchLoading(false);
    }
  }

  function handleSelect(city: GeocodingResult) {
    setSelectedLocation(toWeatherLocation(city));
  }

  return (
    <main className={`min-h-screen overflow-hidden bg-gradient-to-br ${background} text-white transition-colors duration-700`}>
      <div className="pointer-events-none fixed inset-0 opacity-80">
        <div className="absolute left-1/2 top-[-12rem] h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-sky-300/16 blur-3xl" />
        <div className="absolute bottom-[-16rem] right-[-12rem] h-[32rem] w-[32rem] rounded-full bg-amber-200/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-7 px-5 py-7 sm:gap-8 sm:px-8 sm:py-9 lg:px-10 lg:py-12">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/45">Atmos Cast</p>
            <p className="mt-1 text-sm text-white/55">Live weather from Open-Meteo</p>
          </div>
          <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/65 backdrop-blur-2xl">
            Celsius
          </div>
        </header>

        <div className="pb-2 sm:pb-3">
          <SearchBar onSearch={handleSearch} onSelect={handleSelect} isLoading={isSearchLoading} />
        </div>

        {error && (
          <section className="rounded-[1.5rem] border border-red-200/20 bg-red-950/35 p-5 text-sm text-red-50 backdrop-blur-2xl">
            {error} Please try another city or refresh in a moment.
          </section>
        )}

        {isWeatherLoading && !snapshot && <WeatherSkeleton />}

        {snapshot && (
          <div className={`grid gap-7 transition sm:gap-8 xl:gap-10 ${isWeatherLoading ? "opacity-60" : "opacity-100"}`}>
            <div className="grid items-start gap-7 sm:gap-8 xl:grid-cols-[minmax(0,1.08fr)_minmax(400px,0.92fr)] xl:gap-10">
              <CurrentWeatherCard location={snapshot.location} forecast={snapshot.forecast} />
              <HourlyForecast hours={snapshot.hourly} />
            </div>
            <WeatherDetailsGrid forecast={snapshot.forecast} today={snapshot.daily[0]} />
            <DailyForecast days={snapshot.daily} />
          </div>
        )}
      </div>
    </main>
  );
}

function WeatherSkeleton() {
  return (
    <div className="grid gap-7 sm:gap-8 xl:gap-10">
      <div className="grid items-start gap-7 sm:gap-8 xl:grid-cols-[minmax(0,1.08fr)_minmax(400px,0.92fr)] xl:gap-10">
        <div className="min-h-[460px] animate-pulse rounded-[2rem] border border-white/10 bg-white/10 sm:min-h-[500px]" />
        <div className="h-56 animate-pulse rounded-[1.75rem] border border-white/10 bg-white/10" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-40 animate-pulse rounded-[1.5rem] border border-white/10 bg-white/10" />
        ))}
      </div>
      <div className="min-h-[480px] animate-pulse rounded-[1.75rem] border border-white/10 bg-white/10" />
    </div>
  );
}
