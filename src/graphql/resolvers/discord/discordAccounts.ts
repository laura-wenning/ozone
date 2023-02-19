import discordAccountsData from "../../../../public/data/discordAccounts.json";

interface DiscordAccountInclude {

}

interface DiscordAccountWhere {
  id?: string;
  displayName?: string;
}

interface GetDiscordAccountsArguments {
  where: DiscordAccountWhere;
  include: DiscordAccountInclude;
}

interface GetDiscordAccountArguments {
  id: string;
  include: DiscordAccountInclude;
}

/**
 * Fetches a list of discordAccounts
 * @param where The where clause for selecting discordAccounts 
 * @param include Any related documents to include 
 * @returns An array of discordAccounts matching the given criteria
 */
async function discordAccounts(_: unknown, { where, include }: GetDiscordAccountsArguments) {
  return discordAccountsData;
}

/**
 * Fetches a single discordAccount matching the given ID
 * @param id The ID of the discordAccount to fetch
 * @param include Any related documents to include 
 * @returns A discordAccount document. Null if none is found
 */
async function discordAccount(_: unknown, { id, include }: GetDiscordAccountArguments) {
  for (const discordAccount of discordAccountsData) {
    if (discordAccount.id === id) { return discordAccount; }
  }
  return null;
}

export const discordAccountResolvers = {
  Query: {
    discordAccounts,
    discordAccount,
  }
}