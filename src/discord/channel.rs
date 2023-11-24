use serenity::{
    client::Context,
    framework::standard::{
        macros::{command, group},
        CommandResult,
    },
    model::channel::Message,
};

#[group]
#[commands(channel)]
pub struct Channel;

#[command]
async fn channel(ctx: &Context, msg: &Message) -> CommandResult {
    let default_subcommand = "help";
    let normalized_content = msg.content.to_lowercase();
    let args: Vec<&str> = normalized_content.split(' ').collect();
    let subcommand = args.get(1);
    let subcommand = match subcommand {
        Some(subcommand) => *subcommand,
        None => default_subcommand,
    };

    match subcommand {
        "help" => channel_help(ctx, msg, args).await,
        "register" => channel_register(ctx, msg, args).await,
        _ => unknown_command(ctx, msg, args).await,
    }
}

async fn channel_help(ctx: &Context, msg: &Message, _args: Vec<&str>) -> CommandResult {
    msg.reply(ctx, "Channel help").await?;
    Ok(())
}

async fn channel_register(ctx: &Context, msg: &Message, _args: Vec<&str>) -> CommandResult {
    msg.reply(ctx, "Channel register").await?;
    Ok(())
}

async fn unknown_command(ctx: &Context, msg: &Message, _args: Vec<&str>) -> CommandResult {
    msg.reply(ctx, "Unknown channel command").await?;
    Ok(())
}
