import postsData from "../../../../public/data/posts.json";
import discordAuthorData from "../../../../public/data/discordAccounts.json";
import sceneData from "../../../../public/data/scenes.json";

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
  if (!include.discordAuthor && !include.scene) { return postsData; }
  
  const newData = [];
  for (const postData of postsData) {
    const data = {...postData};
    if (include.discordAuthor) {
      for (const discordAuthor of discordAuthorData) {
        if (data.discordAuthorID === discordAuthor.id) {
          data.discordAuthor = discordAuthor;
        }
      }
    }

    if (include.scene) {
      for (const scene of sceneData) {
        if (data.sceneID === scene.id) {
          data.scene = scene;
        }
      }
    }
  }

  return postsData;
}

/**
 * Fetches a single post matching the given ID
 * @param id The ID of the post to fetch
 * @param include Any related documents to include 
 * @returns A post document. Null if none is found
 */
async function post(_: unknown, { id, include }: GetPostArguments) {
  for (const post of postsData) {
    if (post.id === id) { return post; }
  }
  return null;
}

export const postResolvers = {
  Query: {
    posts,
    post,
  }
}