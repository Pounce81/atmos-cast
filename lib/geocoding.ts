import type { GeocodingResponse, GeocodingResult } from "@/types/weather";

const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";

export async function searchCities(query: string, count = 6): Promise<GeocodingResult[]> {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return [];
  }

  const params = new URLSearchParams({
    name: trimmedQuery,
    count: String(count),
    language: "en",
    format: "json"
  });

  const response = await fetch(`${GEOCODING_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error("City search is unavailable right now.");
  }

  const data = (await response.json()) as GeocodingResponse;
  return data.results ?? [];
}
