import type {
  DailyForecastItem,
  ForecastResponse,
  HourlyForecastItem,
  WeatherLocation,
  WeatherSnapshot
} from "@/types/weather";

const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

export const DEFAULT_LOCATION: WeatherLocation = {
  name: "Toronto",
  admin1: "Ontario",
  country: "Canada",
  latitude: 43.6532,
  longitude: -79.3832,
  timezone: "America/Toronto"
};

export async function getWeather(location: WeatherLocation): Promise<WeatherSnapshot> {
  const params = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    timezone: "auto",
    forecast_days: "10",
    temperature_unit: "celsius",
    wind_speed_unit: "kmh",
    precipitation_unit: "mm",
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "is_day",
      "precipitation",
      "weather_code",
      "wind_speed_10m",
      "wind_direction_10m"
    ].join(","),
    hourly: [
      "temperature_2m",
      "apparent_temperature",
      "precipitation_probability",
      "weather_code",
      "is_day"
    ].join(","),
    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "sunrise",
      "sunset",
      "uv_index_max",
      "precipitation_probability_max"
    ].join(",")
  });

  const response = await fetch(`${FORECAST_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Weather data is unavailable right now.");
  }

  const forecast = (await response.json()) as ForecastResponse;

  return {
    location,
    forecast,
    hourly: mapHourlyForecast(forecast).slice(0, 24),
    daily: mapDailyForecast(forecast)
  };
}

function mapHourlyForecast(forecast: ForecastResponse): HourlyForecastItem[] {
  const currentTime = new Date(forecast.current.time).getTime();

  return forecast.hourly.time
    .map((time, index) => ({
      time,
      temperature: forecast.hourly.temperature_2m[index],
      apparentTemperature: forecast.hourly.apparent_temperature[index],
      precipitationProbability: forecast.hourly.precipitation_probability[index],
      weatherCode: forecast.hourly.weather_code[index],
      isDay: Boolean(forecast.hourly.is_day[index])
    }))
    .filter((item) => new Date(item.time).getTime() >= currentTime);
}

function mapDailyForecast(forecast: ForecastResponse): DailyForecastItem[] {
  return forecast.daily.time.map((date, index) => ({
    date,
    weatherCode: forecast.daily.weather_code[index],
    high: forecast.daily.temperature_2m_max[index],
    low: forecast.daily.temperature_2m_min[index],
    sunrise: forecast.daily.sunrise[index],
    sunset: forecast.daily.sunset[index],
    uvIndex: forecast.daily.uv_index_max[index],
    precipitationProbability: forecast.daily.precipitation_probability_max[index]
  }));
}
