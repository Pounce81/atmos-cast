export type GeocodingResult = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  country_code: string;
  admin1?: string;
  timezone: string;
};

export type GeocodingResponse = {
  results?: GeocodingResult[];
  generationtime_ms: number;
};

export type WeatherLocation = Pick<
  GeocodingResult,
  "name" | "latitude" | "longitude" | "country" | "admin1" | "timezone"
>;

export type ForecastResponse = {
  latitude: number;
  longitude: number;
  timezone: string;
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    is_day: number;
    precipitation: number;
    weather_code: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
  };
  current_units: Record<string, string>;
  hourly: {
    time: string[];
    temperature_2m: number[];
    apparent_temperature: number[];
    precipitation_probability: number[];
    weather_code: number[];
    is_day: number[];
  };
  hourly_units: Record<string, string>;
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    sunrise: string[];
    sunset: string[];
    uv_index_max: number[];
    precipitation_probability_max: number[];
  };
  daily_units: Record<string, string>;
};

export type HourlyForecastItem = {
  time: string;
  temperature: number;
  apparentTemperature: number;
  precipitationProbability: number;
  weatherCode: number;
  isDay: boolean;
};

export type DailyForecastItem = {
  date: string;
  weatherCode: number;
  high: number;
  low: number;
  sunrise: string;
  sunset: string;
  uvIndex: number;
  precipitationProbability: number;
};

export type WeatherSnapshot = {
  location: WeatherLocation;
  forecast: ForecastResponse;
  hourly: HourlyForecastItem[];
  daily: DailyForecastItem[];
};
