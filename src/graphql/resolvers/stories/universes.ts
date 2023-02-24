import { buildTagArguments, buildUntagArguments, IndividualTagArguments } from "src/graphql/utilities/stories";
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


interface CreateUniverseArguments {
  universe: {
    universeID?: string;
    name: string;
    summary: string;
  }
  include: UniverseInclude;
}

interface MutateUniverseArguments {
  id: string;
  universe: {
    universeID?: string;
    name?: string;
    summary?: string;
  }
  include: UniverseInclude;
}

interface TagUniverseArguments {
  id: string;
  tags: IndividualTagArguments;
}

interface UntagUniverseArguments {
  id: string;
  tags: string[];
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


/**
 * Creates a new universe
 * @param universe The universe being created
 * @param include Which documents to include when the universe is returned
 * @returns The created universe
 */
 async function createUniverse(_:unknown, { universe, include }: CreateUniverseArguments) {
  const newUniverse = await prisma.universe.create({
    data: {
      ...universe
    },
    include,
  });
  return newUniverse;
}

/**
 * Mutates an universe
 * @param id The ID of the universe to update
 * @param universe The universe fields being updated
 * @param include Which documents to include when the universe is returned
 * @returns The updated actor
 */
async function mutateUniverse(_: unknown, { id, universe, include }: MutateUniverseArguments) {
  return prisma.universe.update({
    data: {
      ...universe,
    },
    include,
    where: { id },
  });
}

/**
 * Allows for deleting an universe
 * @param id The ID of the universe to delete
 * @returns A boolean marking the success
 */
 async function deleteUniverse(_: unknown, { id }: GetUniverseArguments) {
  const universe = await prisma.universe.findUnique({ where: { id } });
  if (!universe) { return false; }
  prisma.universe.delete({ where: { id } });
  return true;
}


/**
 * Tags an universe
 * @param universeID The ID of the universe to tag
 * @param tagID The ID of the tag to apply to the universe
 * @returns
 */
 async function tagUniverse(_: unknown, { id, tags }: TagUniverseArguments) {
  let existingUniverse = await prisma.universe.findUnique({ where: { id: id }});
  const tagArguments = buildTagArguments(tags);

  if (!existingUniverse) { throw `Universe with ID ${id} could not be found`; }

  return prisma.universe.update({
    data: {
      tags: tagArguments
    },
    where: { id },
  });
}

/**
 * Untags an universe
 * @param universeID The ID of the universe to tag
 * @param tagID The ID of the tag to apply to the universe
 * @returns The updated actor
 */
 async function untagUniverse(_: unknown, { id, tags }: UntagUniverseArguments) {
  let existingUniverse = await prisma.universe.findUnique({ where: { id: id }});
  const tagArguments = buildUntagArguments(tags);

  if (!existingUniverse) { throw `Universe with ID ${id} could not be found`; }

  return prisma.universe.update({
    data: {
      tags: tagArguments
    },
    include: { tags: true },
    where: { id },
  });
}

export const universeResolvers = {
  Query: {
    universes,
    universe,
  }
}