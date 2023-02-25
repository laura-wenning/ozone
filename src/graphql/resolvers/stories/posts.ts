import { IndividualTagArguments, buildTagArguments, buildUntagArguments } from "src/graphql/utilities/stories";
import { getPrismaClient } from "utilities/server/prisma";

const prisma = getPrismaClient();

interface PostInclude {
  discordAuthor?: boolean;
  scene?: boolean;
  tags?: boolean;
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

interface MutatePostArguments {
  id: string;
  post: {
    sceneID?: string;
    isBorder?: boolean;
  }
  include: PostInclude;
}

interface TagPostArguments {
  id: string;
  tags: IndividualTagArguments;
}

interface UntagPostArguments {
  id: string;
  tags: string[];
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

/**
 * Mutates an post
 * @param id The ID of the post to update
 * @param post The post fields being updated
 * @param include Which documents to include when the post is returned
 * @returns The updated actor
 */
async function mutatePost(_: unknown, { id, post, include }: MutatePostArguments) {
  return prisma.post.update({
    data: {
      ...post as any,
      scene: (post.sceneID ? { connect: { id: post.sceneID }} : undefined),
    },
    include,
    where: { id },
  });
}

/**
 * Tags an post
 * @param postID The ID of the post to tag
 * @param tagID The ID of the tag to apply to the post
 * @returns
 */
 async function tagPost(_: unknown, { id, tags }: TagPostArguments) {
  let existingPost = await prisma.post.findUnique({ where: { id: id }});
  const tagArguments = buildTagArguments(tags);

  if (!existingPost) { throw `Post with ID ${id} could not be found`; }

  return prisma.post.update({
    data: {
      tags: tagArguments
    },
    where: { id },
  });
}

/**
 * Untags an post
 * @param postID The ID of the post to tag
 * @param tagID The ID of the tag to apply to the post
 * @returns The updated actor
 */
 async function untagPost(_: unknown, { id, tags }: UntagPostArguments) {
  let existingPost = await prisma.post.findUnique({ where: { id: id }});
  const tagArguments = buildUntagArguments(tags);

  if (!existingPost) { throw `Post with ID ${id} could not be found`; }

  return prisma.post.update({
    data: {
      tags: tagArguments
    },
    include: { tags: true },
    where: { id },
  });
}

export const postResolvers = {
  Query: {
    posts,
    post,
  },
  Mutation: {
    mutatePost,

    tagPost,
    untagPost,
  }

}