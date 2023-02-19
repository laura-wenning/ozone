import universes from "../../../../public/data/universes.json";

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
async function getUniverses(_: unknown, { where, include }: GetUniversesArguments) {
  return universes;
}

/**
 * Fetches a single universe matching the given ID
 * @param id The ID of the universe to fetch
 * @param include Any related documents to include 
 * @returns A universe document. Null if none is found
 */
async function getUniverse(_: unknown, { id, include }: GetUniverseArguments) {
  for (const universe of universes) {
    if (universe.id === id) { return universe; }
  }
  return null;
}

export const universeResolvers = {
  Query: {
    getUniverses,
    getUniverse,
  }
}