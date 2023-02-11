import { gql } from "apollo-server-micro";

export const postTypeDefs = gql`
  type Post {
    id: String # The UUID of the post
    sceneID: String # The ID of the scene that this post belongs to
    discordAuthorID: Number # The ID of the Discord user who posted this
    authorID: String # The database UUID of the use who made this. Nullable.

    content: String # The text content of the post
    postedAt: Date # The datetime this post was made (UTC)
    isBorder: Boolean # True if this is a border marker between two scenes (eg "-- scene --")
  }
`;