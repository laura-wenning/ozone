import discord from "discord.js";

let ozoneBot: discord.Client;

function intializeOzone() {
  ozoneBot = new discord.Client();
  ozoneBot.on("ready", () => {
    console.log("Ozone is ready!");
  });

  ozoneBot.login(process.env.OZONE_TOKEN);  
}

function getOzone() {
  if (ozoneBot === undefined) {
    intializeOzone();
  }
  return ozoneBot;
}

export default getOzone;
