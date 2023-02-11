import { gql } from "apollo-server-micro";

export const arcTypeDefs = gql`
  # Describes a story arc, with multiple scenes telling a longer story
  type Arc {
    id: String! # The UUID of this arc in the database
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

  }

  input CreateArc {
    universeID: String
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
    arc(id: String!, include: ArcInclude): Arc
  }

  type Mutation {
    createArc(arc: CreateArc!, include: ArcInclude): Arc!
    mutateArc(id: String!, arc: MutateArc!, include: ArcInclude): Arc!
    deleteArc(id: String!): Arc!
  }
`;
