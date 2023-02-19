import { gql } from "apollo-server-micro";

// Users are people who are able to log in and access Ozone
export const userTypeDefs = gql`
  type User {
    id: String
    displayName: String

    posts: [Post]!
    discordAccounts: [DiscordAccount]!
  }

   # Input for asking for nested fields to return
  input UserInclude {
    tags: Boolean
    args: Boolean
  }

  input UsereWhere {
    
  }

  input MutateUser {
    displayName: String
  }

  type Query {
    users(where: UserWhere, include: UserInclude): [User]!
    user(id: String!, include: UserInclude): User
  }

  type Mutation {
    createUser(arc: CreateUser!, include: UserInclude): User!
    mutateUser(id: String!, arc: MutateUser!, include: UserInclude): User!
    deleteUser(id: String!): User!
  }
`;