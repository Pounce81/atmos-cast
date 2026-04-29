import type { ForecastResponse, WeatherLocation } from "@/types/weather";
import { formatLocation, formatTemperature, getConditionIcon, getConditionLabel } from "@/lib/formatters";

type CurrentWeatherCardProps = {
  location: WeatherLocation;
  forecast: ForecastResponse;
};

export function CurrentWeatherCard({ location, forecast }: CurrentWeatherCardProps) {
  const todayHigh = forecast.daily.temperature_2m_max[0];
  const todayLow = forecast.daily.temperature_2m_min[0];
  const condition = getConditionLabel(forecast.current.weather_code);
  const icon = getConditionIcon(forecast.current.weather_code);

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/14 p-7 shadow-glow backdrop-blur-2xl sm:p-9 lg:p-10">
      <div className="absolute -right-14 -top-16 h-44 w-44 rounded-full bg-cyan-300/20 blur-3xl" />
      <div className="absolute -bottom-20 left-8 h-48 w-48 rounded-full bg-rose-300/10 blur-3xl" />

      <div className="relative flex min-h-[430px] flex-col justify-between gap-12 sm:min-h-[500px] xl:min-h-[560px]">
        <div className="flex items-start justify-between gap-6 sm:gap-8">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-white/50">Now</p>
            <h1 className="mt-4 max-w-[13ch] text-4xl font-semibold leading-none text-white sm:text-6xl lg:text-7xl">
              {location.name}
            </h1>
            <p className="mt-4 text-sm text-white/60 sm:text-base">
              {formatLocation("", location.admin1, location.country).replace(/^, /, "")}
            </p>
          </div>
          <div className="grid h-20 w-20 shrink-0 place-items-center rounded-[1.75rem] bg-white/15 text-5xl shadow-inner shadow-white/10 sm:h-24 sm:w-24 sm:text-6xl">
            {icon}
          </div>
        </div>

        <div>
          <div className="flex items-end gap-3">
            <p className="text-[6.5rem] font-semibold leading-[0.86] tracking-normal text-white sm:text-[9rem] lg:text-[10rem] xl:text-[11rem]">
              {formatTemperature(forecast.current.temperature_2m)}
            </p>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-white">
            <p className="text-xl font-medium">{condition}</p>
            <p className="text-white/65">
              H:{formatTemperature(todayHigh)} L:{formatTemperature(todayLow)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
