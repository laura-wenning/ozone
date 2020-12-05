import discord, { TextChannel } from "discord.js";
import { ChannelModel, Channel, Post, PostModel } from "./mongoose";

export class RPReader {
  private bot: discord.Client
  private locked = false;
  private engaged = true;
  private timeoutMilliseconds = 300 * 1000;

  constructor(bot: discord.Client) {
    this.bot = bot;
  }

  public async start() {
    this.engaged = true;
  }

  public stop() {
    this.engaged = false;
  }

  /**
   * Initializes a channel to read through. Potentially moveable to the Ozone web app
   * @param channelID 
   * @param firstMessageID 
   */
  public async initializeChannel(channelID, firstMessageID) {
    // Check that the channel is not in the db already
    const channelCheck = await ChannelModel.find({channelID: channelID});
    if (channelCheck.length !== 0) { console.log(`Channel ${channelCheck[0].name} already exists`); return;}

    // add the channel to the db
    let dcChannel 
    try {
      dcChannel = await this.bot.channels.fetch(channelID) as TextChannel;
    } catch { 
      console.log(`Channel ID '${channelID}' was not found.`);
      return;
    }

    let dcMessage;
    try {
      dcMessage = await dcChannel.messages.fetch(firstMessageID);
    } catch (e) {
      console.log(`Message ID '${firstMessageID}' does not exist in ${dcChannel.name}`);
      return;
    } 

    console.log(dcMessage)
    // Channel
    const channel: Channel = {
      name: dcChannel.name,
      channelID: dcChannel.id,
      lastMessage: firstMessageID
    };
    await ChannelModel.create(channel);

    const postCheck = await PostModel.find({postID: firstMessageID});
    if (postCheck.length !== 0) { console.log(`Post for channel '${dcChannel.name}' already exists. Exiting.`); return; }

    // add the first post to the db
    const post: Post = {
      channelID: channelID,
      postID: firstMessageID,
      authorID: dcMessage.author.id,
      content: dcMessage.content,
      createdTimestamp: dcMessage.createdTimestamp,
      editedTimestamp: dcMessage.editedTimestamp,
      wordCount: wordCount(dcMessage.content)
    }
    await PostModel.create(post);
  } 

  private async loop() {
    this.read();
    while(true) {
      setTimeout(() => this.read(), this.timeoutMilliseconds);
    }
  }

  private lock() {
    this.locked = true;
  }

  private unlock() {
    this.locked = false;
  }

  private async fetchMessagesFrom(channel) {
    const dcChannel = await this.bot.channels.fetch(channel.channelID) as TextChannel;
    const messages = await dcChannel.messages.fetch({after: channel.lastMessage, limit: 100});


    // discordChannel.message
    return messages.array().reverse();
  }

  private fetchLastMessages(channel) {
    return [];
  }

  private async fetchDBChannels() {
    const channels = await ChannelModel.find();
    return channels;
  }

  public async read() {
    // Ensures we don't have multiple reads going on
    if(this.locked || !this.engaged ) { console.log("Locked"); return; }
    this.lock();

    const channels = await this.fetchDBChannels();
    channels.forEach((channel: any) => {
      this.readChannel(channel);
    });

    this.unlock();
  }

  /**
   * Reads a channel
   * @param channel The channel to read
   */
  private async readChannel(channel: any) {
    while(true) {
      const messages = await this.fetchMessagesFrom(channel);
      if (messages.length == 0) { break; }

      messages.forEach((message: any) => {
        this.readMessage(message);
        channel.lastMessage = message.id;
      });
      await ChannelModel.update({_id: channel._id}, channel);
      sleep(1000);
    }

    const messages = this.fetchLastMessages(channel);
    messages.forEach((message: any) => {
      this.updateMessage(message);
    });
  }

  private async readMessage(message) {
    const postCheck = await PostModel.find({postID: message.id});
    if (postCheck.length !== 0) { return; }

    const post: Post = {
      channelID: message.channel.id,
      postID: message.id,
      authorID: message.author.id,
      content: message.content,
      createdTimestamp: message.createdTimestamp,
      editedTimestamp: message.editedTimestamp,
      wordCount: wordCount(message.content)
    }
    await PostModel.create(post);
  }

  private async updateMessage(message) {

  }


}


function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function wordCount(content) {
  return content.split(" ").length;
}