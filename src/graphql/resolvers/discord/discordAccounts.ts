import { getPrismaClient } from "utilities/server/prisma";

const prisma = getPrismaClient();

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
  return prisma.discordAccount.findMany({
    where: { ...where },
    include,
  });
}

/**
 * Fetches a single discordAccount matching the given ID
 * @param id The ID of the discordAccount to fetch
 * @param include Any related documents to include 
 * @returns A discordAccount document. Null if none is found
 */
async function discordAccount(_: unknown, { id, include }: GetDiscordAccountArguments) {
  return prisma.discordAccount.findUnique({ where: { id }, include });
}

export const discordAccountResolvers = {
  Query: {
    discordAccounts,
    discordAccount,
  }
}