use serde::Deserialize;

pub struct Weather {
  main: String,
  description: String,
  temp: f32,
  feels_like: f32,
  high: f32,
  low: f32,
  wind: f32,
}

#[derive(Deserialize, Debug)]
struct WeatherResponseItemMain {
  temp: f32,
  feels_like: f32,
  temp_min: f32, 
  temp_max: f32,
  pressure: u32,
  sea_level: u32,
  grnd_level: u32,
  humidity: u32,
  temp_kf: u32
}

#[derive(Deserialize, Debug)]
struct WeatherResponseItemWeather {
  id: u32,
  main: String,
  description: String,
  icon: String,
}

#[derive(Deserialize, Debug)]
pub struct WeatherResponseItem {
  dt: u32,
  main: WeatherResponseItemMain,
  weather: Vec<WeatherResponseItemWeather>,
  clouds: {
    all: u32,
  },
  wind: {
    speed: f32,
    deg: u32,
    gust: f32,
  },
  visibility: u32,
  pop: u32,
  sys: {
    pod: char,
  },
  dt_text: String,
}

#[derive(Deserialize, Debug)]
pub struct WeatherResponse {
  cod: String,
  message: f32,
  cnt: i8,
  list: Vec<WeatherResponseItem>,
  city: {
    id: u32,
    name: String,
    coord: {
      lat: f32,
      lon: f32
    },
    country: String,
    population: u32,
    timezone: u32,
    sunrise: u32,
    sunset: u32
  }
}
