use serenity::{
    client::Context,
    framework::standard::{
        macros::{command, group},
        CommandResult,
    },
    model::channel::Message,
};

#[group]
#[commands(source)]
pub struct Source;

#[command]
async fn source(ctx: &Context, msg: &Message) -> CommandResult {
    let default_subcommand = "help";
    let normalized_content = msg.content.to_lowercase();
    let args: Vec<&str> = normalized_content.split(' ').collect();
    let subcommand = args.get(1);
    let subcommand = match subcommand {
        Some(subcommand) => *subcommand,
        None => default_subcommand,
    };

    match subcommand {
        "help" => source_help(ctx, msg, args).await,
        "register" => source_register(ctx, msg, args).await,
        _ => unknown_command(ctx, msg, args).await,
    }
}

async fn source_help(ctx: &Context, msg: &Message, args: Vec<&str>) -> CommandResult {
    msg.reply(ctx, "Source help").await?;
    Ok(())
}

async fn source_register(ctx: &Context, msg: &Message, args: Vec<&str>) -> CommandResult {
    msg.reply(ctx, "Source register").await?;
    Ok(())
}

async fn unknown_command(ctx: &Context, msg: &Message, args: Vec<&str>) -> CommandResult {
    msg.reply(ctx, "Unknown command").await?;
    Ok(())
}
