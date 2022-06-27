use std::env;
use std::sync::Once;

pub struct Weather {
  main: String,
  description: String,
  temp: f32,
  feels_like: f32,
  high: f32,
  low: f32,
  wind: f32,
}

static mut APP_KEY: Option<String> = None;
static INIT: Once = Once::new();

pub fn get_hourly(lat: f32, long: f32) {
  let app_key = get_app_key();
  let url = format!(
    "https://pro.openweathermap.org/data/2.5/forecast/hourly?lat={}&lon={}&appid={}",
    lat,
    long,
    app_key
  ); //count {
  //   Some(x) -> x;
  //   None: "";
  // }
  println!("Weather URL: {}", url);
}

fn get_app_key() -> String {
  INIT.call_once(|| {
    unsafe {
      APP_KEY = Some(env::var("WEATHER_API_KEY").expect("The 'WEATHER_API_KEY' environment variable must be set."));
    }
  });

  let app_key: String;
  unsafe {
    app_key = APP_KEY.as_ref().unwrap().to_string();
  }
  return app_key;
}

