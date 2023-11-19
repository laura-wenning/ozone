# Development Setup
1. Use https://rustup.rs to install Rust. 
2. In Ozone, run `cargo run`

## Additional CLIs and External Dependencies
`sea-orm-cli`. Used for creating migrations and applying them to the database

# Environment Variables
## Discord Bot
`DISCORD_TOKEN`. The Discord token for the Ozone bot. 
`DISCORD_DEVELOPER_ID`. The Discord ID of the current developer for delivery of on-ready messages 
### Feature Flags
`ENABLE_DISCORD_BOT`. Enables Discord bot. Allows for the bot to be disabled for frontend development. Enabled with a value of true (not implemented)

## Database
`DATABASE_URL`. The URL to the database. This can be set manually, or with individual environment variables in the following format:
```bash
DATABASE_URL=postgres://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}/${DATABASE_DATABASE}
```

`DATABASE_USERNAME`. (Optional). The username to use for connecting to the database.
`DATABASE_PASSWORD`. (Optional). The password to use for connecting to the database.
`DATABASE_HOST`. (Optional). The host where the database is located.
`DATABASE_DATABASE`. (Optional). The specific database to connect to.