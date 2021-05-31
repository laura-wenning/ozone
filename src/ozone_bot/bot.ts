import discord from "discord.js";
import { Champion } from "./champion";

let ozoneBot: discord.Client;

async function intializeOzone() {
  ozoneBot = new discord.Client();
  ozoneBot.on("ready", async () => {
    const champion = new Champion(ozoneBot);
    console.log("Ozone is ready!");
  });

  await ozoneBot.login(process.env.OZONE_TOKEN)

}

async function getOzone() {
  if (ozoneBot === undefined) {
    intializeOzone();
  }
  return ozoneBot;
}

export default getOzone;
