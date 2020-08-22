import discord from "discord.js";
import config from "../config";

let ozoneBot: discord.Client;

function intializeOzone() {
  ozoneBot = new discord.Client();
  ozoneBot.on("ready", () => {
    console.log("Ozone is ready!");
  });

  ozoneBot.login(config.token);  
}

function getOzone() {
  if (ozoneBot === undefined) {
    intializeOzone();
  }
  return ozoneBot;
}

export default getOzone;
