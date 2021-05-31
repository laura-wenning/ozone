import { Client, User } from "discord.js";
import cron from "node-cron";
import * as weather from "./weather";

export class Champion {
  private ozone: Client;
  protected champion: User;

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
    this.fetchTodaysWeather();
    cron.schedule(`0 12 * * *`, () => {
      this.sendTodaysWeather();
    });
    this.sendTodaysWeather();
    // await this.champion.send("Hello Laura! Ozone up and on standby")
    // this.sendTodaysWeather();

  }

  protected send(message: string) {
    this.champion.send(message);
  }

  protected throw(err: Error | string | unknown) {
    if (typeof err === "string") { this.send(err); }
    else { this.send(JSON.stringify(err)); }
    throw err;
  }

  protected fetchTodaysWeather = weather.fetchTodaysWeather;
  protected kelvinToFahrenheit = weather.kelvinToFahrenheit;
  protected weatherToReadable = weather.weatherToReadable;
  public sendTodaysWeather = weather.sendTodaysWeather;
}
