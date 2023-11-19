use std::env;

use sea_orm::{Database, DatabaseConnection};

pub async fn connect() -> Option<DatabaseConnection> {
    let connection_uri = match env::var("DATABASE_URL") {
        Ok(connection_uri) => connection_uri,
        Err(_) => return None,
    };

    let db_result = Database::connect(connection_uri).await;

    match db_result {
        Ok(db) => Some(db),
        Err(why2) => {
            println!("{}", why2);
            None
        }
    }
}
