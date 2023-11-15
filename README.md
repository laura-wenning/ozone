# Development Setup
1. Use https://rustup.rs to install Rust. 
2. In Ozone, run `cargo run`

# Environment Variables
## Discord Bot
`DISCORD_TOKEN`. The Discord token for the Ozone bot. 
`DISCORD_DEVELOPER_ID`. The Discord ID of the current developer for delivery of on-ready messages 
### Feature Flags
`ENABLE_DISCORD_BOT`. Enables Discord bot. Allows for the bot to be disabled for frontend development. Enabled with a value of true (not implemented)

## Database
`POSTGRES_USERNAME`. The username to use for connecting to the database.
`POSTGRES_PASSWORD`. The password to use for connecting to the database.
`POSTGRES_HOST`. The host where the database is located.
`POSTGRES_DATABASE`. The specific database to connect to.