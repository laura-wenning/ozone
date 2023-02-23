import { getPrismaClient } from "utilities/server/prisma";

const prisma = getPrismaClient();

interface PostInclude {
  discordAuthor?: boolean;
  scene?: boolean;
}

interface PostWhere {
  sceneID?: string;
  discordAuthorID?: string;
  isBorder?: boolean;
}

interface GetPostsArguments {
  where: PostWhere;
  include: PostInclude;
}

interface GetPostArguments {
  id: string;
  include: PostInclude;
}

/**
 * Fetches a list of posts
 * @param where The where clause for selecting posts 
 * @param include Any related documents to include 
 * @returns An array of posts matching the given criteria
 */
async function posts(_: unknown, { where, include }: GetPostsArguments) {
  return prisma.post.findMany({
    where: { ...where },
    include,
  });
}

/**
 * Fetches a single post matching the given ID
 * @param id The ID of the post to fetch
 * @param include Any related documents to include 
 * @returns A post document. Null if none is found
 */
async function post(_: unknown, { id, include }: GetPostArguments) {
  return prisma.post.findUnique({ where: { id }, include });
}

export const postResolvers = {
  Query: {
    posts,
    post,
  }
}