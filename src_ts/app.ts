import dotenv from "dotenv";
import { createServer } from "http";
import next from "next";
import { parse } from "url";
import { Ozone } from './discord/Ozone';

// Load in environment variables on development only
if (process.env.NODE_ENV === "development") {
  dotenv.config();
}

const isDev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || "3000"; 

const app = next({ dev: isDev });
const handle = app.getRequestHandler();

let ozone;

app.prepare().then(() => {
  createServer(async (req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  }).listen(port);

  console.log(`Discord Connection: ${process.env.ENABLE_DISCORD_BOT === "1" ? "Enabled" : "Disabled"}`);
  if (process.env.ENABLE_DISCORD_BOT === "1") {
    ozone = new Ozone();
  }

  console.log(
    `> Server listening at http://localhost:${port} as ${
      isDev ? 'development' : process.env.NODE_ENV
    }`
  )
});
