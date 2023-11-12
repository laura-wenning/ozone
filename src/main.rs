use self::discord_bot::discord_start;
use dotenv;

mod discord_bot;

fn main() {
	dotenv::dotenv().ok();

	println!("Hello, world!");
	discord_start();
}
