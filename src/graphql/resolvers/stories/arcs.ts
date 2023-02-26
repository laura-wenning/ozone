import { IndividualTagArguments, buildTagArguments, buildUntagArguments } from "src/graphql/utilities/stories";
import { getPrismaClient } from "utilities/server/prisma";

const prisma = getPrismaClient();

interface ArcInclude {
  universes?: boolean;
  scenes?: boolean;
}

interface ArcWhere {
  id?: string;
  universeID?: string;
  name?: string;
}

interface GetArcsArguments {
  where: ArcWhere;
  include: ArcInclude;
}

interface GetArcArguments {
  id: string;
  include: ArcInclude;
}

interface CreateArcArguments {
  arc: {
    universeID?: string;
    name: string;
    summary: string;
  }
  include: ArcInclude;
}

interface MutateArcArguments {
  id: string;
  arc: {
    universeID?: string;
    name?: string;
    summary?: string;
  }
  include: ArcInclude;
}

interface TagArcArguments {
  id: string;
  tags: IndividualTagArguments;
}

interface UntagArcArguments {
  id: string;
  tags: string[];
}


/**
 * Fetches a list of arcs
 * @param where The where clause for selecting arcs 
 * @param include Any related documents to include 
 * @returns An array of arcs matching the given criteria
 */
async function arcs(_: unknown, { where, include }: GetArcsArguments) {
  return prisma.arc.findMany({
    where: { ...where },
    include,
  });
}

/**
 * Fetches a single arc matching the given ID
 * @param id The ID of the arc to fetch
 * @param include Any related documents to include 
 * @returns A arc document. Null if none is found
 */
async function arc(_: unknown, { id, include }: GetArcArguments) {
  return prisma.arc.findUnique({ where: { id }, include });
}

/**
 * Creates a new arc
 * @param arc The arc being created
 * @param include Which documents to include when the arc is returned
 * @returns The created arc
 */
async function createArc(_:unknown, { arc, include }: CreateArcArguments) {
  const newArc = await prisma.arc.create({
    data: {
      name: arc.name,
      summary: arc.summary,
      universe: arc.universeID ? { connect: { id: arc.universeID }} : undefined,
    },
    include,
  });
  return newArc;
}

/**
 * Mutates an arc
 * @param id The ID of the arc to update
 * @param arc The arc fields being updated
 * @param include Which documents to include when the arc is returned
 * @returns The updated actor
 */
async function mutateArc(_: unknown, { id, arc, include }: MutateArcArguments) {
  let universe;

  // Fetches the actor sheet, if it is being changed
  if (arc.universeID) {
    universe = await prisma.universe.findUnique({ where: { id: arc.universeID }});
    if (!universe) { throw "Error"; }
  }

  return prisma.arc.update({
    data: {
      ...arc as any,
      universe: (universe ? { connect: { id: universe.id }} : undefined),
    },
    include,
    where: { id },
  });
}

/**
 * Allows for deleting an arc
 * @param id The ID of the arc to delete
 * @returns A boolean marking the success
 */
 async function deleteArc(_: unknown, { id }: GetArcArguments) {
  const arc = await prisma.arc.findUnique({ where: { id } });
  if (!arc) { return false; }
  prisma.arc.delete({ where: { id } });
  return true;
}


/**
 * Tags an arc
 * @param arcID The ID of the arc to tag
 * @param tagID The ID of the tag to apply to the arc
 * @returns
 */
 async function tagArc(_: unknown, { id, tags }: TagArcArguments) {
  let existingArc = await prisma.arc.findUnique({ where: { id: id }});
  const tagArguments = buildTagArguments(tags);

  if (!existingArc) { throw `Arc with ID ${id} could not be found`; }

  return prisma.arc.update({
    data: {
      tags: tagArguments
    },
    where: { id },
  });
}

/**
 * Untags an arc
 * @param arcID The ID of the arc to tag
 * @param tagID The ID of the tag to apply to the arc
 * @returns The updated actor
 */
 async function untagArc(_: unknown, { id, tags }: UntagArcArguments) {
  let existingArc = await prisma.arc.findUnique({ where: { id: id }});
  const tagArguments = buildUntagArguments(tags);

  if (!existingArc) { throw `Arc with ID ${id} could not be found`; }

  return prisma.arc.update({
    data: {
      tags: tagArguments
    },
    include: { tags: true },
    where: { id },
  });
}

export const arcResolvers = {
  Query: {
    arcs,
    arc,
  },
  Mutation: {
    createArc,
    mutateArc,
    deleteArc,

    tagArc,
    untagArc,
  }
}

