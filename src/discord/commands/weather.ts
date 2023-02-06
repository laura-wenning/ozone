import { rest } from "../../utilities/request";



export async function fetchTodaysWeather() {
  const API_KEY = process.env.WEATHER_API_KEY;
  if (!API_KEY) { throw "No Weather API key found." }
  const weatherResponse = await rest.get("http://api.openweathermap.org/data/2.5/weather", { q: "detroit", APPID: API_KEY});
  return weatherResponse;
}

export function kelvinToFahrenheit(kelvin: number) {
  const celsius = kelvin - 273.15;
  return (celsius * (9/5)) + 32;
}

export function weatherToReadable(
  main: string,
  description: string,
  temp: number,
  feelsLike: number,
  high: number,
  low: number,
  wind: number
): string {
  return `Good morning! Today, the weather is ${main.toLowerCase()}. It is currently ${Math.round(temp)} degrees, and will get up to ${Math.round(high)}.`;
}

export async function sendTodaysWeather(): Promise<string> {
  const weather = await this.fetchTodaysWeather() as any;
  const message = this.weatherToReadable(
    weather.weather[0].main,
    weather.weather[0].description,
    this.kelvinToFahrenheit(weather.main.temp),
    this.kelvinToFahrenheit(weather.main.feels_like),
    this.kelvinToFahrenheit(weather.main.temp_max),
    this.kelvinToFahrenheit(weather.main.temp_min),
    weather.wind.speed,
  );

  return message;
}
