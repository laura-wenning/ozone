use std::env;

use sea_orm::{Database, DatabaseConnection};

pub async fn connect() -> Option<DatabaseConnection> {
    let username = match env::var("POSTGRES_USERNAME") {
        Ok(username) => username,
        Err(_) => return None,
    };

    let password = match env::var("POSTGRES_PASSWORD") {
        Ok(password) => password,
        Err(_) => return None,
    };

    let host = match env::var("POSTGRES_HOST") {
        Ok(host) => host,
        Err(_) => return None,
    };

    let database = match env::var("POSTGRES_DATABASE") {
        Ok(database) => database,
        Err(_) => return None,
    };
    let connection_uri = format!("postgres://{}:{}@{}/{}", username, password, host, database);
    let db_result = Database::connect(connection_uri).await;

    match db_result {
        Ok(db) => Some(db),
        Err(why2) => {
            println!("{}", why2);
            None
        }
    }
}
