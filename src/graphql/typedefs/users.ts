import { gql } from "apollo-server-micro";

// Users are people who are able to log in and access Ozone
export const userTypeDefs = gql`
  type User {
    id: ID
    displayName: String

    posts: [Post]!
    discordAccounts: [DiscordAccount]!
  }

   # Input for asking for nested fields to return
  input UserInclude {
    tags: Boolean
    args: Boolean
  }

  input UserWhere {
    displayName: String
  }

  input MutateUser {
    displayName: String
  }

  type Query {
    users(where: UserWhere, include: UserInclude): [User]!
    user(id: ID!, include: UserInclude): User
  }

  # type Mutation {
    # createUser(arc: CreateUser!, include: UserInclude): User!
    # mutateUser(id: ID!, arc: MutateUser!, include: UserInclude): User!
    # deleteUser(id: ID!): User!
  # }
`;