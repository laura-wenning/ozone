use self::discord::discord_start;
use entity::{discord_source, sea_orm_active_enums::DiscordSourceType};
use migration::{Migrator, MigratorTrait};
use sea_orm::{ActiveModelBehavior, ActiveModelTrait, DatabaseConnection, DbErr, Set};

mod database;
mod discord;

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
    // let _mdl = insert_test_discord_source(&db).await;
    let discord_thread = discord_start();
    println!("Yo!");

    discord_thread.await;
}

async fn insert_test_discord_source(
    db: &DatabaseConnection,
) -> Result<discord_source::Model, DbErr> {
    let mut discord_source = discord_source::ActiveModel::new();
    discord_source.server_name = Set("Test Server!".into());
    discord_source.channel_name = Set("Test Channel!".into());

    discord_source.discord_server_id = Set(1234);
    discord_source.discord_channel_id = Set(4321);

    discord_source.is_active = Set(true);
    discord_source.source_type = Set(DiscordSourceType::Bot);

    discord_source.insert(db).await
}
