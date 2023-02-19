import posts from "../../../../public/data/posts.json";

interface PostInclude {

}

interface PostWhere {
  id?: string;
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
async function getPosts(_: unknown, { where, include }: GetPostsArguments) {
  return posts;
}

/**
 * Fetches a single post matching the given ID
 * @param id The ID of the post to fetch
 * @param include Any related documents to include 
 * @returns A post document. Null if none is found
 */
async function getPost(_: unknown, { id, include }: GetPostArguments) {
  for (const post of posts) {
    if (post.id === id) { return post; }
  }
  return null;
}

export const postResolvers = {
  Query: {
    getPosts,
    getPost,
  }
}