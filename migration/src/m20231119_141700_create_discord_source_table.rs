use sea_orm_migration::{prelude::*, sea_orm::EnumIter, sea_query::extension::postgres::Type};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_type(
                Type::create()
                    .as_enum(DiscordSourceType::Table)
                    .values([
                        DiscordSourceType::None,
                        DiscordSourceType::Bot,
                        DiscordSourceType::Roleplay,
                    ])
                    .to_owned(),
            )
            .await?;

        manager
            .create_table(
                Table::create()
                    .table(DiscordSource::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(DiscordSource::Id)
                            .uuid()
                            .not_null()
                            .primary_key(),
                    )
                    .col(
                        ColumnDef::new(DiscordSource::ServerName)
                            .string()
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(DiscordSource::ChannelName)
                            .string()
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(DiscordSource::DiscordServerId)
                            .big_integer()
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(DiscordSource::DiscordChannelId)
                            .big_integer()
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(DiscordSource::IsActive)
                            .boolean()
                            .not_null()
                            .default(false),
                    )
                    .col(
                        ColumnDef::new(DiscordSource::SourceType)
                            .enumeration(
                                DiscordSourceType::Table,
                                [
                                    DiscordSourceType::None,
                                    DiscordSourceType::Bot,
                                    DiscordSourceType::Roleplay,
                                ],
                            )
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(DiscordSource::SourceConfig)
                            .json()
                            .not_null()
                            .default("{}"),
                    )
                    .col(
                        ColumnDef::new(DiscordSource::LastSweptAt)
                            .date_time()
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(DiscordSource::CreatedAt)
                            .date_time()
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(DiscordSource::UpdatedAt)
                            .date_time()
                            .not_null(),
                    )
                    .to_owned(),
            )
            .await?;
        Ok(())
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(DiscordSource::Table).to_owned())
            .await?;
        manager
            .drop_type(Type::drop().name(DiscordSourceType::Table).to_owned())
            .await?;
        Ok(())
    }
}

#[derive(DeriveIden)]
enum DiscordSource {
    Table,
    #[sea_orm(iden = "discord_source_id")]
    Id,
    ServerName,
    ChannelName,
    DiscordServerId,
    DiscordChannelId,
    IsActive,
    SourceType,
    SourceConfig,
    LastSweptAt,
    CreatedAt,
    UpdatedAt,
}

#[derive(Iden, EnumIter)]
pub enum DiscordSourceType {
    Table,
    #[iden = "none"]
    None,
    #[iden = "bot"]
    Bot,
    #[iden = "roleplay"]
    Roleplay,
}
