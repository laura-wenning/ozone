use std::env;

use serenity::futures::future::Ready;
use serenity::{async_trait, Error};
use serenity::prelude::*;
use serenity::model::channel::Message;
use serenity::framework::standard::macros::{command, group};
use serenity::framework::standard::{StandardFramework, CommandResult};
use serenity::model::id::UserId;

#[group]
#[commands(ping)]
struct General;

struct Handler;

#[async_trait]
impl EventHandler for Handler {
  async fn ready(&self, ctx: Context, ready: Ready) {

  }
}

pub async fn discord_start() {
  let framework = StandardFramework::new()
    .configure(|c| c.prefix("/"))
    .group(&GENERAL_GROUP);

  let token = env::var("DISCORD_TOKEN").expect("token");
  let intents = GatewayIntents::non_privileged() | GatewayIntents::MESSAGE_CONTENT;
  let mut client = Client::builder(token, intents)
    .event_handler(Handler)
    .framework(framework)
    .await
    .expect("Error creating client");

  let client_thread = client.start();
  
  
  if let Err(why) = client_thread.await {
    on_startup_fail(why);
  }
}


fn on_startup_fail(why: Error) {
  println!("An error occured while running the client: {:?}", why);
}

#[command]
async fn ping(ctx: &Context, msg: &Message) -> CommandResult {
  msg.reply(ctx, "Pong!").await?;
  Ok(())
}