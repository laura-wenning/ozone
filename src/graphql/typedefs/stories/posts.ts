import { gql } from "apollo-server-micro";

export const postTypeDefs = gql`
  # Describes a single post within a story, usually one to three paragraphs
  type Post {
    id: ID! # The UUID of the post
    scene: Scene # The ID of the scene that this post belongs to
    discordAuthor: DiscordAccount! # The ID of the Discord user who posted this

    content: String! # The text content of the post
    postedAt: Date! # The datetime this post was made (UTC)
    isBorder: Boolean! # True if this is a border marker between two scenes (eg "-- scene --")
  }

  # Input for asking for nested fields to return
  input PostInclude {
    scene: Boolean
    author: Boolean
  }

  input PostWhere {
    sceneID: String
    discordAuthorID: ID
    isBorder: Boolean
  }

  input MutatePost {
    sceneID: String
    discordAuthorID: ID
    name: String
    summary: String
  }

  type Query {
    posts(where: PostWhere, include: PostInclude): [Post]!
    post(id: ID!, include: PostInclude): Post
  }

  type Mutation {
    mutatePost(id: ID!, post: MutatePost!, include: PostInclude): Post!
    deletePost(id: ID!): Post!
  }
`;