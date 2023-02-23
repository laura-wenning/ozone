import { getPrismaClient } from "utilities/server/prisma";

const prisma = getPrismaClient();

interface UniverseInclude {

}

interface UniverseWhere {
  id?: string;
  name?: string;
}

interface GetUniversesArguments {
  where: UniverseWhere;
  include: UniverseInclude;
}

interface GetUniverseArguments {
  id: string;
  include: UniverseInclude;
}

/**
 * Fetches a list of universes
 * @param where The where clause for selecting universes 
 * @param include Any related documents to include 
 * @returns An array of universes matching the given criteria
 */
async function universes(_: unknown, { where, include }: GetUniversesArguments) {
  return prisma.universe.findMany({
    where: { ...where },
    include,
  });
}

/**
 * Fetches a single universe matching the given ID
 * @param id The ID of the universe to fetch
 * @param include Any related documents to include 
 * @returns A universe document. Null if none is found
 */
async function universe(_: unknown, { id, include }: GetUniverseArguments) {
  return prisma.universe.findUnique({ where: { id }, include });
}

export const universeResolvers = {
  Query: {
    universes,
    universe,
  }
}