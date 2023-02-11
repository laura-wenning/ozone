import { gql } from "apollo-server-micro";

// Universes are people who are able to log in an access Ozone
export const userTypeDefs = gql`
  type Universe {
    id: String
    displayName: String

    posts: [Post]! @relation
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