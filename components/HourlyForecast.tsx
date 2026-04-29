import type { HourlyForecastItem } from "@/types/weather";
import { formatHour, formatPercent, formatTemperature, getConditionIcon } from "@/lib/formatters";

type HourlyForecastProps = {
  hours: HourlyForecastItem[];
};

export function HourlyForecast({ hours }: HourlyForecastProps) {
  return (
    <section className="rounded-[1.75rem] border border-white/12 bg-white/10 p-6 backdrop-blur-2xl sm:p-7">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/55">Hourly forecast</h2>
        <span className="text-sm text-white/45">Next 24 hours</span>
      </div>
      <div className="-mx-6 flex gap-4 overflow-x-auto px-6 pb-3 sm:-mx-7 sm:gap-5 sm:px-7 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {hours.map((hour, index) => (
          <article
            key={hour.time}
            className="grid min-w-28 place-items-center gap-3.5 rounded-3xl border border-white/10 bg-white/10 px-5 py-5 text-center shadow-lg shadow-black/10"
          >
            <p className="text-sm font-medium text-white/65">{index === 0 ? "Now" : formatHour(hour.time)}</p>
            <p className="text-3xl">{getConditionIcon(hour.weatherCode)}</p>
            <p className="text-xl font-semibold text-white">{formatTemperature(hour.temperature)}</p>
            <p className="text-xs text-sky-100/70">{formatPercent(hour.precipitationProbability)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
