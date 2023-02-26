# Development Setup
1. Install required modules using `yarn install`
2. Create a .env file. Refer to the environment variables section below
3. Run `prisma generate` to create the files required for typing
4. If using a new database, run `prisma db push` to create the database structure
5. Run with `yarn dev`

# Environment Variables
`NODE_ENV`. The Node Environment
`POST`. The port used by the NodeJS app or the NodeJS Docker container. 

`DATABASE_URL`. The database address 

`DISCORD_TOKEN`. The Discord token for the Ozone bot. Required if ENABLE_DISCORD_BOT is 1
`WEATHER_API_KEY`. The key for accessing weather data.

`POSTFIX`. A string postfixed to the end of the Docker container names for organization purposes. Use an empty string in production. This postfix will be deprecated in the future as Docker will only be used for deployment and not development.

## Feature Flags
`ENABLE_DISCORD_BOT`. Enables Discord bot. Allows for the bot to be disabled for frontend development. Enabled with a value of 1



