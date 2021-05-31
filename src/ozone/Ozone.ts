import { Client, User } from "discord.js";
import cron from "node-cron";
import * as weather from "./weather";
import champions from "../config/champions.json";

export enum DeploymentEnum {
  DEV,
  STAGE,
  PROD
}

export class Ozone {
  protected deployment: DeploymentEnum;
  protected bot: Client;
  protected champions: Record<string, User> = {};

  constructor() {
    this.determineDeployment();

    this.bot = new Client();
    this.bot.on("ready", async () => {
      this.onReady();
    });

    console.log("Beginning login.")
    this.bot.login(process.env.OZONE_TOKEN);
  }

  // WEATHER
  protected fetchTodaysWeather = weather.fetchTodaysWeather;
  protected kelvinToFahrenheit = weather.kelvinToFahrenheit;
  protected weatherToReadable = weather.weatherToReadable;
  public sendTodaysWeather = weather.sendTodaysWeather;

  /**
   * Determines the current deployment type. This may be used later on for 
   * differences in runtime
   */
  private async determineDeployment() {
    const deployment = process.env.DEPLOYMENT || "";
    switch(deployment.toLowerCase()) {
      case "production":
        this.deployment = DeploymentEnum.PROD;
        break;
      case "staging":
        this.deployment = DeploymentEnum.STAGE;
        break;
      case "development":
      default:
        this.deployment = DeploymentEnum.DEV;
        break;
    }
  }

  /**
   * Handles base functionality when the client is ready
   */
  private async onReady() {
    console.log("Log in successful.")
    // Load champions
    this.loadChampions();    
  }

  /**
   * Loads all potential usable champions
   */
  private async loadChampions() {
    console.log("Loading champions.")
    champions.forEach(async (championID: string) => {
      const tempChampion = await new User(this.bot, { id: championID });
      if (!tempChampion) { 
        console.warn(`User with ID ${championID} was not found.`);
        return; 
      }
      this.champions[championID] = tempChampion;
      this.champions[championID].createDM();

      cron.schedule(`0 12 * * *`, () => {
        this.sendTodaysWeather(this.champions[championID]);
      });

      this.sendOnReady(this.champions[championID]);
    });
  }

  /**
   * Sends an On Ready message to a champion
   * @param champion The champion to send a message to
   */
  private async sendOnReady(champion: User) {
    // TODO - descriminate on the current version we're running
    this.send(champion, "I'm back!")
  }

  /**
   * Sends a message to a champion's DMs
   * @param champion The champion to send a message to 
   * @param message The message to send
   */
  protected send(champion: User, message: string) {
    champion.send(message);
  }
}