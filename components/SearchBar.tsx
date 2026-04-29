"use client";

import { FormEvent, useState } from "react";
import type { GeocodingResult } from "@/types/weather";
import { formatLocation } from "@/lib/formatters";

type SearchBarProps = {
  onSearch: (query: string) => Promise<GeocodingResult[]>;
  onSelect: (city: GeocodingResult) => void;
  isLoading: boolean;
};

export function SearchBar({ onSearch, onSelect, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeocodingResult[]>([]);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    try {
      const cities = await onSearch(query);
      setResults(cities);
      if (cities.length === 0) {
        setMessage("No matching cities found. Try a nearby larger city.");
      }
    } catch (error) {
      setResults([]);
      setMessage(error instanceof Error ? error.message : "Search failed. Please try again.");
    }
  }

  function handleSelect(city: GeocodingResult) {
    onSelect(city);
    setQuery(formatLocation(city.name, city.admin1, city.country));
    setResults([]);
    setMessage("");
  }

  return (
    <section className="relative z-20">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-3 rounded-[1.75rem] border border-white/15 bg-white/12 p-2.5 shadow-2xl shadow-black/20 backdrop-blur-2xl transition focus-within:border-white/35 sm:rounded-full sm:p-3"
      >
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/12 text-lg sm:h-12 sm:w-12">
          🔎
        </div>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search city"
          className="min-w-0 flex-1 bg-transparent text-base text-white outline-none placeholder:text-white/55"
          aria-label="Search city"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-100 disabled:cursor-not-allowed disabled:opacity-60 sm:px-6"
        >
          {isLoading ? "Loading" : "Search"}
        </button>
      </form>

      {(results.length > 0 || message) && (
        <div className="absolute left-0 right-0 top-full mt-4 overflow-hidden rounded-3xl border border-white/15 bg-slate-950/90 shadow-2xl shadow-black/35 backdrop-blur-2xl">
          {message && <p className="px-5 py-4 text-sm text-white/70">{message}</p>}
          {results.map((city) => (
            <button
              key={`${city.id}-${city.latitude}-${city.longitude}`}
              type="button"
              onClick={() => handleSelect(city)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-white/10"
            >
              <span>
                <span className="block font-medium text-white">{city.name}</span>
                <span className="text-sm text-white/55">
                  {[city.admin1, city.country].filter(Boolean).join(", ")}
                </span>
              </span>
              <span className="text-sm text-white/35">{city.country_code}</span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
