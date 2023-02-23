import { TagType } from "@prisma/client";
import { getPrismaClient } from "utilities/server/prisma";

const prisma = getPrismaClient();

interface TagInclude {

}

interface TagWhere {
  name?: string;
  type?: TagType;
}

interface GetTagsArguments {
  where: TagWhere;
  include: TagInclude;
}

interface GetTagArguments {
  id: string;
  include: TagInclude;
}

/**
 * Fetches a list of tags
 * @param where The where clause for selecting tags 
 * @param include Any related documents to include 
 * @returns An array of tags matching the given criteria
 */
async function tags(_: unknown, { where, include }: GetTagsArguments) {
  return prisma.tag.findMany({
    where: { ...where },
    include,
  });
}

/**
 * Fetches a single tag matching the given ID
 * @param id The ID of the tag to fetch
 * @param include Any related documents to include 
 * @returns A tag document. Null if none is found
 */
async function tag(_: unknown, { id, include }: GetTagArguments) {
  return prisma.tag.findUnique({ where: { id }, include });
}

export const tagResolvers = {
  Query: {
    tags,
    tag,
  }
}