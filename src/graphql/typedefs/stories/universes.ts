import { gql } from "apollo-server-micro";

export const UniverseTypeDefs = gql`
  # Describes a fictional world or universe that stories take place in
  type Universe {
    id: String!
    name: String! # The name of this universe
    summary: String! # A summary/description of this universe

    tags: [Tag]! @relation
    arcs: [Universe]! @relation
  }

  # Input for asking for nested fields to return
  input UniverseInclude {
    tags: Boolean
    args: Boolean
  }

  input UniverseWhere {
    
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
    universe(id: String!, include: UniverseInclude): Universe
  }

  type Mutation {
    createUniverse(arc: CreateUniverse!, include: UniverseInclude): Universe!
    mutateUniverse(id: String!, arc: MutateUniverse!, include: UniverseInclude): Universe!
    deleteUniverse(id: String!): Universe!
  }
`;