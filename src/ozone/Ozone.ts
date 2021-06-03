import { Client, Message, User } from "discord.js";
import cron from "node-cron";
import { sendTodaysWeather } from "../commands/weather";
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
    this.loadCommands();
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

      cron.schedule(`30 11 * * *`, async () => {
        this.send(this.champions[championID], await sendTodaysWeather());
      });

      this.sendOnReady(this.champions[championID]);
    });
  }

  private async loadCommands() {
    const prefix = "!";
    this.bot.on("message", async (message: Message) => {
      if(!message.content.startsWith(prefix)) {
        return;
      }

      // slices off prefix from our message, then trims extra whitespace, then returns our array of words from the message
      const args = message.content.slice(prefix.length).trim().split(' ');
    
      // splits off the first word from the array, which will be our command
      const command = args.shift().toLowerCase();

      switch(command) {
        case "test":
          message.reply("Test successful! Go us");
          break;
        case "weather":
          message.reply(await sendTodaysWeather());
          break;
      }
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