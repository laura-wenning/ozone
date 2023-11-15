use std::env;

use serenity::model::gateway::Ready;
use serenity::{async_trait, Error};
use serenity::prelude::*;
use serenity::model::channel::Message;
use serenity::framework::standard::macros::{command, group};
use serenity::framework::standard::{StandardFramework, CommandResult};

#[group]
#[commands(ping)]
struct General;

struct Handler;

#[async_trait]
impl EventHandler for Handler {
  async fn ready(&self, ctx: Context, ready: Ready) {
    println!("{} is connected!", ready.user.name);

    let developer_id = match get_developer_id() {
      Some(developer_id) => developer_id,
      None => return,
    };
    
    let developer = match ctx.http.get_user(developer_id).await {
      Ok(developer) => developer,
      Err(_) => return,
    };
    
    let content = "I'm back!";

    let _ = developer.direct_message(
      &ctx, 
      |m| m.content(&content)
    ).await;
  }
}

/// Loads the current developer's Discord ID (DEVELOPER_DISCORD_ID) from env variables 
/// and parses it into a u64. 
fn get_developer_id() -> Option<u64> {
  let developer_id = match env::var("DEVELOPER_DISCORD_ID") {
    Ok(id) => id,
    Err(_) => return None,
  };

  let developer_id = match developer_id.parse::<u64>() {
    Ok(id) => id,
    Err(_) => return None,
  };

  Some(developer_id)
}

pub async fn discord_start() {
  let framework: StandardFramework = StandardFramework::new()
    .configure(|c| c.prefix("/"))
    .group(&GENERAL_GROUP);

  let token: String = env::var("DISCORD_TOKEN").expect("token");
  let intents: GatewayIntents = GatewayIntents::non_privileged() | GatewayIntents::MESSAGE_CONTENT;
  let mut client: Client = Client::builder(token, intents)
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