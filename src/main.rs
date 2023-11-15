use self::discord_bot::discord_start;
use dotenv;

mod discord_bot;

#[tokio::main]
async fn main() {
	dotenv::dotenv().ok();

	println!("Hello, world!");
	let discord_thread = discord_start();
	println!("Yo!");

	discord_thread.await;
}
