import { getWeatherCodeMeta } from "@/lib/weatherCodes";

const weekdayFormatter = new Intl.DateTimeFormat("en", { weekday: "short" });
const timeFormatter = new Intl.DateTimeFormat("en", { hour: "numeric" });
const detailTimeFormatter = new Intl.DateTimeFormat("en", {
  hour: "numeric",
  minute: "2-digit"
});

export function formatTemperature(value: number): string {
  return `${Math.round(value)}°`;
}

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}

export function formatWindSpeed(value: number): string {
  return `${Math.round(value)} km/h`;
}

export function formatHour(value: string): string {
  return timeFormatter.format(new Date(value));
}

export function formatDetailTime(value: string): string {
  return detailTimeFormatter.format(new Date(value));
}

export function formatWeekday(value: string, index: number): string {
  return index === 0 ? "Today" : weekdayFormatter.format(new Date(`${value}T12:00:00`));
}

export function formatLocation(name: string, admin1?: string, country?: string): string {
  return [name, admin1, country].filter(Boolean).join(", ");
}

export function getConditionLabel(code: number): string {
  return getWeatherCodeMeta(code).label;
}

export function getConditionIcon(code: number): string {
  return getWeatherCodeMeta(code).icon;
}

export function getUvLabel(value: number): string {
  if (value < 3) return "Low";
  if (value < 6) return "Moderate";
  if (value < 8) return "High";
  if (value < 11) return "Very high";
  return "Extreme";
}

export function getCompassDirection(degrees: number): string {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return directions[Math.round(degrees / 45) % 8];
}
