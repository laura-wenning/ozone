use std::env;
use std::sync::Once;
use reqwest::Error;

mod model;


static mut APP_KEY: Option<String> = None;
static INIT: Once = Once::new();

#[tokio::main]
pub async fn get_hourly(lat: f32, long: f32) -> Result<(), Error> {
  let app_key = get_app_key();
  let url = format!(
    "https://pro.openweathermap.org/data/2.5/forecast?lat={}&lon={}&appid={}",
    lat,
    long,
    app_key
  ); 
  
  println!("Weather URL: {}", url);
  let response = reqwest::get(&url).await?;
  let raw_weather: model::WeatherResponse = response.json().await?;
  // print!(response);
  // Ok(raw_weather);
  return Ok(());
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

