use std::env;

use serenity::async_trait;
use serenity::model::channel::Message;
use serenity::model::gateway::Ready;
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
  async fn ready(&self, _: Context, ready: Ready) {
    println!("{} is connected!", ready.user.name)
  }
}

#[tokio::main]
pub async fn start_discord_bot() -> Client {
  let token = env::var("OZONE_TOKEN").expect("The 'OZONE_TOKEN' environment variable must be set");

  // Intents describes what events the bot will be notified about
  let intents = GatewayIntents::DIRECT_MESSAGES | GatewayIntents::MESSAGE_CONTENT;

  let mut client = Client::builder(&token, intents).event_handler(Handler).await.expect("Error creating client");

  if let Err(why) = client.start().await {
    println!("Client error: {:?}", why);
  }
  return client;
}