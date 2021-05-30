import { Client, User } from "discord.js";


export class Champion {
  private ozone: Client;
  private champion: User;

  constructor(ozone: Client) {
    this.ozone = ozone;
    this.initialize();
  }

  private async initialize() {
    this.champion = await new User(this.ozone, { id: process.env.CHAMPION_ID });
    if (!this.ozone.user) {
      throw "Ozone user does not exist";
    }
    await this.champion.createDM();
    await this.champion.send("Hello Laura! Ozone up and on standby")
  }

 
}