# Environment Variables
## .env
`POSTFIX`. A string postfixed to the end of the Docker container names for organization purposes. Use an empty string in production. 
`NODE_PORT`. The port used by the NodeJS app or the NodeJS Docker container. 
`MONGO_PORT`. The port used by the MongoDB container

`DEPLOYMENT`. Which sort of deployment this is. Valid options are 'deployment', 'staging', and 'production'.

`OZONE_TOKEN`. The Discord token for the Ozone bot. TODO - replace with DISCORD_TOKEN. 

`WEATHER_API_KEY`. The key for accessing weather data.

`MONGO_USERNAME`. The username for connecting to MongoDB
`MONGO_PASSWORD`. The password for connecting to MongoDB
`MONGO_ADDRESS`. The endpoint that MongoDB is located at. For example, 127.0.0.1. 
`MONGO_DB`. The name of the database to use in MongoDB.

## .mongo.env
`MONGO_INITDB_ROOT_USERNAME`. The initial root username for a first-time MongoDB launch. 
`MONGO_INITDB_ROOT_PASSWORD`. The initial root password for a first-time MongoDB launch. 