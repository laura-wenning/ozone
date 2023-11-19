use self::discord_bot::discord_start;
use migration::{Migrator, MigratorTrait};

mod database;
mod discord_bot;

#[tokio::main]
async fn main() {
    dotenv::dotenv().ok();

    println!("Hello, world!");
    let db = database::connect().await;
    let db = match db {
        Some(db) => {
            println!("Database connection accepted!");
            db
        }
        None => panic!("Database connection failed :("),
    };

    let migrator = Migrator::up(&db, None).await;
    if let Err(why) = migrator {
        panic!("{:?}", why);
    }

    let discord_thread = discord_start();
    println!("Yo!");

    discord_thread.await;
}
