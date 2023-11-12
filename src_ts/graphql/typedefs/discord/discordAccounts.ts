import { gql } from "apollo-server-micro";

export const discordAccountTypeDefs = gql`
  type DiscordAccount {
    id: ID! # The UUID of the discord account in the database
    owner: User! # The user who owns this account

    discordID: Int! # The ID of this user in Discord
    tagName: String! # The tag name of the user in Discord
    tagNumber: Int! # The tag number of the user in Discord

    posts: [Post!]!
  }

  # Input for asking for nested fields to return
  input DiscordAccountInclude {
    owner: Boolean
    posts: Boolean
  }

  input DiscordAccountWhere {
    displayName: String
  }

  type Query {
    discordAccounts(where: DiscordAccountWhere, include: DiscordAccountInclude): [DiscordAccount]
    discordAccount(id: ID!, include: UserInclude): User
  }
`;