import { gql } from "apollo-server-micro";

export const arcTypeDefs = gql`
  # Describes a story arc, with multiple scenes telling a longer story
  type Arc {
    id: ID! # The UUID of this arc in the database
    universe: Universe # The universe/world that this arc belongs to

    name: String! # The name of this arc
    summary: String! # A summary/description of this arc

    scenes: [Scene]!
  }

  # Input for asking for nested fields to return
  input ArcInclude {
    universe: Boolean
    scenes: Boolean
  }

  input ArcWhere {
    universeID: ID
    name: String
  }

  input CreateArc {
    universeID: ID
    name: String!
    summary: String!
  }

  input MutateArc {
    universeID: String
    name: String
    summary: String
  }

  type Query {
    arcs(where: ArcWhere, include: ArcInclude): [Arc]!
    arc(id: ID!, include: ArcInclude): Arc
  }

  type Mutation {
    createArc(arc: CreateArc!, include: ArcInclude): Arc!
    mutateArc(id: ID!, arc: MutateArc!, include: ArcInclude): Arc!
    deleteArc(id: ID!): Arc!

    tagArc(id: ID!, tags: TagLinks!): Arc!
    untagArc(id: ID!, tags: [ID!]!): Arc!
  }
`;
