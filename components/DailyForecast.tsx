import type { DailyForecastItem } from "@/types/weather";
import { formatTemperature, formatWeekday, getConditionIcon, getConditionLabel } from "@/lib/formatters";

type DailyForecastProps = {
  days: DailyForecastItem[];
};

export function DailyForecast({ days }: DailyForecastProps) {
  const minTemp = Math.min(...days.map((day) => day.low));
  const maxTemp = Math.max(...days.map((day) => day.high));
  const range = Math.max(maxTemp - minTemp, 1);

  return (
    <section className="rounded-[1.75rem] border border-white/12 bg-white/10 p-6 backdrop-blur-2xl sm:p-7 lg:p-8">
      <h2 className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-white/55">10-day forecast</h2>
      <div className="space-y-3">
        {days.map((day, index) => {
          const start = ((day.low - minTemp) / range) * 100;
          const width = Math.max(((day.high - day.low) / range) * 100, 12);

          return (
            <article
              key={day.date}
              className="grid grid-cols-[4.75rem_2.75rem_1fr] items-center gap-4 rounded-2xl px-3 py-4 transition hover:bg-white/10 sm:grid-cols-[6rem_3.25rem_1fr_8rem] sm:px-4"
            >
              <p className="font-medium text-white">{formatWeekday(day.date, index)}</p>
              <p className="text-2xl" aria-label={getConditionLabel(day.weatherCode)}>
                {getConditionIcon(day.weatherCode)}
              </p>
              <div className="grid grid-cols-[2.75rem_1fr_2.75rem] items-center gap-4">
                <p className="text-right text-sm font-medium text-white/50">{formatTemperature(day.low)}</p>
                <div className="h-2 rounded-full bg-white/12">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-sky-300 via-amber-200 to-orange-300"
                    style={{ marginLeft: `${start}%`, width: `${width}%` }}
                  />
                </div>
                <p className="text-sm font-medium text-white">{formatTemperature(day.high)}</p>
              </div>
              <p className="hidden truncate text-right text-sm text-white/50 sm:block">
                {getConditionLabel(day.weatherCode)}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
