import { Client } from "discord.js";

const MAX_LOGIN_ATTEMPTS = 5;
const TIME_BETWEEN_ATTEMPTS = 10 * 1000;

/**
 * Attempts to log in a Discord bot. Will retry on failure.
 * @param bot The Discord bot that will be logged in
 */
export async function attemptLogin(bot: Client) {
  console.log("Attempting login...");
  if (await makeLoginCall(bot)) { return; }
  console.log(`Login failed.`)


  let loginAttempts = 1;
  const loginInterval = setInterval(async () => {
    if (loginAttempts >= MAX_LOGIN_ATTEMPTS) { 
      console.log("Maximum login attempts exceeded.");
      clearInterval(loginInterval);
      return;
    }

    ++loginAttempts;
    console.log(`Retrying login... [${loginAttempts}/${MAX_LOGIN_ATTEMPTS}]`)
    if (await makeLoginCall(bot)) {
      clearInterval(loginInterval);
      return;
    }
     
    console.log(`Login failed.`)
  }, TIME_BETWEEN_ATTEMPTS);

}

/**
 * Makes the log in call for a given Discord bot. Returns true on success, false otherwise
 * @param bot The bot to log in
 */
async function makeLoginCall(bot: Client): Promise<boolean> {
  try {
    await bot.login(process.env.OZONE_TOKEN);
    return true;
  } catch (e) {
    // TODO - log this error with a proper logger
    console.error(e);
    return false;
  }
}
