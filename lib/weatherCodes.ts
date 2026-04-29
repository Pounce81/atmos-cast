export type WeatherCodeMeta = {
  label: string;
  icon: string;
  accent: "clear" | "cloud" | "rain" | "storm" | "snow" | "fog";
};

const weatherCodes: Record<number, WeatherCodeMeta> = {
  0: { label: "Clear sky", icon: "☀️", accent: "clear" },
  1: { label: "Mostly clear", icon: "🌤️", accent: "clear" },
  2: { label: "Partly cloudy", icon: "⛅", accent: "cloud" },
  3: { label: "Overcast", icon: "☁️", accent: "cloud" },
  45: { label: "Fog", icon: "🌫️", accent: "fog" },
  48: { label: "Rime fog", icon: "🌫️", accent: "fog" },
  51: { label: "Light drizzle", icon: "🌦️", accent: "rain" },
  53: { label: "Drizzle", icon: "🌦️", accent: "rain" },
  55: { label: "Heavy drizzle", icon: "🌧️", accent: "rain" },
  56: { label: "Freezing drizzle", icon: "🌧️", accent: "rain" },
  57: { label: "Freezing drizzle", icon: "🌧️", accent: "rain" },
  61: { label: "Light rain", icon: "🌦️", accent: "rain" },
  63: { label: "Rain", icon: "🌧️", accent: "rain" },
  65: { label: "Heavy rain", icon: "🌧️", accent: "rain" },
  66: { label: "Freezing rain", icon: "🌧️", accent: "rain" },
  67: { label: "Freezing rain", icon: "🌧️", accent: "rain" },
  71: { label: "Light snow", icon: "🌨️", accent: "snow" },
  73: { label: "Snow", icon: "❄️", accent: "snow" },
  75: { label: "Heavy snow", icon: "❄️", accent: "snow" },
  77: { label: "Snow grains", icon: "🌨️", accent: "snow" },
  80: { label: "Rain showers", icon: "🌦️", accent: "rain" },
  81: { label: "Rain showers", icon: "🌧️", accent: "rain" },
  82: { label: "Heavy showers", icon: "🌧️", accent: "rain" },
  85: { label: "Snow showers", icon: "🌨️", accent: "snow" },
  86: { label: "Snow showers", icon: "❄️", accent: "snow" },
  95: { label: "Thunderstorm", icon: "⛈️", accent: "storm" },
  96: { label: "Thunderstorm", icon: "⛈️", accent: "storm" },
  99: { label: "Severe storm", icon: "⛈️", accent: "storm" }
};

export function getWeatherCodeMeta(code: number): WeatherCodeMeta {
  return weatherCodes[code] ?? { label: "Variable conditions", icon: "🌡️", accent: "cloud" };
}
