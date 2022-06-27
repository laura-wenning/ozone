use dotenv;

pub mod discord;
pub mod glean;
// use crate::discord;

fn main() {
  dotenv::dotenv().ok();
  
  // discord::
  println!("Run!");
  glean::weather::get_hourly(15.51, -32.1);
  discord::start();
}