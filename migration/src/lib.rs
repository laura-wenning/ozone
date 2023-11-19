pub use sea_orm_migration::prelude::*;

mod m20231119_141700_create_discord_source_table;

pub struct Migrator;

#[async_trait::async_trait]
impl MigratorTrait for Migrator {
    fn migrations() -> Vec<Box<dyn MigrationTrait>> {
        vec![Box::new(
            m20231119_141700_create_discord_source_table::Migration,
        )]
    }
}
