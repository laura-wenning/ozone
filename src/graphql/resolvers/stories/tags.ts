import tags from "../../../../public/data/tags.json";

interface TagInclude {

}

interface TagWhere {
  id?: string;
  name?: string;
  type?: string;
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
async function getTags(_: unknown, { where, include }: GetTagsArguments) {
  return tags;
}

/**
 * Fetches a single tag matching the given ID
 * @param id The ID of the tag to fetch
 * @param include Any related documents to include 
 * @returns A tag document. Null if none is found
 */
async function getTag(_: unknown, { id, include }: GetTagArguments) {
  for (const tag of tags) {
    if (tag.id === id) { return tag; }
  }
  return null;
}

export const tagResolvers = {
  Query: {
    getTags,
    getTag,
  }
}