use serenity::{
    client::Context,
    framework::standard::{
        macros::{command, group},
        CommandResult,
    },
    model::channel::Message,
};

#[group]
#[commands(source_register)]
pub struct Source;

#[command]
async fn source_register(ctx: &Context, msg: &Message) -> CommandResult {
    msg.reply(ctx, "Register received").await?;
    Ok(())
}
