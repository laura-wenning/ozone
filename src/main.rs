use self::discord_bot::discord_start;
use migration::{Migrator, MigratorTrait};

mod database;
mod discord_bot;

#[tokio::main]
async fn main() {
    dotenv::dotenv().ok();

    println!("Hello, world!");
    let db = database::connect().await;
    match db {
        Some(_) => println!("Database connection accepted!"),
        None => println!("Database connection failed :("),
    }

    Migrator::up(&db, None).await?;

    let discord_thread = discord_start();
    println!("Yo!");

    discord_thread.await;
}
