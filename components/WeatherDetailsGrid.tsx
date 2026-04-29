import type { DailyForecastItem, ForecastResponse } from "@/types/weather";
import {
  formatDetailTime,
  formatPercent,
  formatTemperature,
  formatWindSpeed,
  getCompassDirection,
  getUvLabel
} from "@/lib/formatters";

type WeatherDetailsGridProps = {
  forecast: ForecastResponse;
  today: DailyForecastItem;
};

type DetailCard = {
  label: string;
  value: string;
  helper: string;
  icon: string;
};

export function WeatherDetailsGrid({ forecast, today }: WeatherDetailsGridProps) {
  const details: DetailCard[] = [
    {
      label: "Feels like",
      value: formatTemperature(forecast.current.apparent_temperature),
      helper: "Perceived temperature",
      icon: "🌡️"
    },
    {
      label: "Humidity",
      value: formatPercent(forecast.current.relative_humidity_2m),
      helper: "Current relative humidity",
      icon: "💧"
    },
    {
      label: "Wind",
      value: formatWindSpeed(forecast.current.wind_speed_10m),
      helper: `${getCompassDirection(forecast.current.wind_direction_10m)} wind`,
      icon: "🧭"
    },
    {
      label: "Precipitation",
      value: formatPercent(today.precipitationProbability),
      helper: `${forecast.current.precipitation.toFixed(1)} mm now`,
      icon: "☔"
    },
    {
      label: "Sunrise",
      value: formatDetailTime(today.sunrise),
      helper: `Sunset ${formatDetailTime(today.sunset)}`,
      icon: "🌅"
    },
    {
      label: "UV index",
      value: Math.round(today.uvIndex).toString(),
      helper: getUvLabel(today.uvIndex),
      icon: "☀️"
    }
  ];

  return (
    <section>
      <h2 className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-white/55">Weather details</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {details.map((detail) => (
          <article
            key={detail.label}
            className="min-h-40 rounded-[1.5rem] border border-white/12 bg-white/10 p-5 backdrop-blur-2xl transition hover:bg-white/14 sm:p-6"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">{detail.label}</p>
              <span className="text-xl">{detail.icon}</span>
            </div>
            <p className="mt-7 text-3xl font-semibold text-white">{detail.value}</p>
            <p className="mt-3 text-sm text-white/50">{detail.helper}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
