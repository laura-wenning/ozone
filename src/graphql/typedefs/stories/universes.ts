import { gql } from "apollo-server-micro";

export const universeTypeDefs = gql`
  # Describes a fictional world or universe that stories take place in
  type Universe {
    id: ID!
    name: String! # The name of this universe
    summary: String! # A summary/description of this universe

    tags: [Tag!]!
    arcs: [Universe!]!
  }

  # Input for asking for nested fields to return
  input UniverseInclude {
    tags: Boolean
    args: Boolean
  }

  input UniverseWhere {
    name: String
  }

  input CreateUniverse {
    name: String!
    summary: String!
  }

  input MutateUniverse {
    universeID: String
    name: String
    summary: String
  }

  type Query {
    universes(where: UniverseWhere, include: UniverseInclude): [Universe]!
    universe(id: ID!, include: UniverseInclude): Universe
  }

  type Mutation {
    createUniverse(arc: CreateUniverse!, include: UniverseInclude): Universe!
    mutateUniverse(id: ID!, arc: MutateUniverse!, include: UniverseInclude): Universe!
    deleteUniverse(id: ID!): Universe!
  }
`;