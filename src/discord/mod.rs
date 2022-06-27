use std::env;

use serenity::async_trait;
use serenity::model::channel::Message;
use serenity::model::gateway::Ready;
use serenity::model::id::ChannelId;
use serenity::prelude::*;

// const PREFIX = "~";

struct Handler;

#[async_trait]
impl EventHandler for Handler {
  /**
   * Handles the 'message' event.
   */
  async fn message(&self, ctx: Context, msg: Message) {
    if msg.content != "!ping" { return; }
    // Replies with pong. Prints error if one occurs
    if let Err(why) = msg.channel_id.say(&ctx.http, "Pong!").await {
      println!("Error sending message: {:?}", why);
    }
  }

  /**
   * Handles the 'ready' event when the Bot is ready to go
   */
  async fn ready(&self, ctx: Context, ready: Ready) {
    println!("{} is connected!", ready.user.name);
    let channel_id = ChannelId(971241123198677002);
    
    if let Err(why) = channel_id.send_message(&ctx.http, |m| { m.content("I'm back!") }).await {
      println!("Could not send startup message :(. See: {:?}", why);
    };
    // let message = Message::builder().channel_id(channel_id).
  }
}

#[tokio::main]
pub async fn start() -> Client {
  let token = env::var("DISCORD_TOKEN").expect("The 'DISCORD_TOKEN' environment variable must be set");

  // Intents describes what events the bot will be notified about
  let intents = GatewayIntents::DIRECT_MESSAGES | GatewayIntents::MESSAGE_CONTENT;

  let mut client = Client::builder(&token, intents).event_handler(Handler).await.expect("Error creating client");

  if let Err(why) = client.start().await {
    println!("Client error: {:?}", why);
  }
  return client;
}
