import { Champion } from ".";

export async function fetchTodaysWeather(this: Champion) {
  const API_KEY = process.env.WEATHER_API_KEY;
  if (!API_KEY) { this.throw("No Weather API key found.") }
  return {};
}

export function weatherToReadable(): string {
  return "";
}

export function sendTodaysWeather(this: Champion): void {
  this.champion.send("Good morning, Laura! The weather this morning is really sunny, and it'll be nice and toasty later with a high of 80 degrees.")
}
