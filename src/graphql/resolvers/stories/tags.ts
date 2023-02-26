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

export interface CreateTag {
  name: string;
  type: TagType;
  description?: string;
}

interface CreateTagArguments {
  tag: CreateTag;
  include: TagInclude;
}

interface MutateTagArguments {
  id: string;
  tag: {
    name?: string;
    type?: TagType;
    description?: string;
  }
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


/**
 * Creates a new tag
 * @param tag The tag being created
 * @param include Which documents to include when the tag is returned
 * @returns The created tag
 */
 async function createTag(_:unknown, { tag, include }: CreateTagArguments) {
  const newTag = await prisma.tag.create({
    data: {
      ...tag
    },
    include,
  });
  return newTag;
}

/**
 * Mutates an tag
 * @param id The ID of the tag to update
 * @param tag The tag fields being updated
 * @param include Which documents to include when the tag is returned
 * @returns The updated actor
 */
async function mutateTag(_: unknown, { id, tag, include }: MutateTagArguments) {
  return prisma.tag.update({
    data: tag,
    include,
    where: { id },
  });
}

/**
 * Allows for deleting an tag
 * @param id The ID of the tag to delete
 * @returns A boolean marking the success
 */
 async function deleteTag(_: unknown, { id }: GetTagArguments) {
  const tag = await prisma.tag.findUnique({ where: { id } });
  if (!tag) { return false; }
  prisma.tag.delete({ where: { id } });
  return true;
}


export const tagResolvers = {
  Query: {
    tags,
    tag,
  },
  Mutation: {
    createTag,
    mutateTag,
    deleteTag,
  }
}