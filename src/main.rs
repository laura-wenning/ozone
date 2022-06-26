use dotenv;

pub mod discord;
// use crate::discord;

fn main() {
  dotenv::dotenv().ok();
  
  // discord::
  println!("Run!");
  discord::start_discord_bot();
}