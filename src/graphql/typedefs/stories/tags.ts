import { gql } from "apollo-server-micro";

export const tagTypeDefs = gql`
  # Information about what kind of tag this is
  enum TagType {
    CHARACTER, # A character
    LOCATION, # The location or setting of the scene or arc
    EVENT, # The type of event that happens, such as a fight
    KEYWORD, # A catch-all, such as "werewolf" or "Dusk Court"
  }

  # Describes reuseable tags that can be applied to scenes, arcs, or universes
  type Tag {
    id: ID!

    name: String !# The name of the tag
    type: TagType! # The type of tag that this is
    description: String! # A description of this tag

    posts: [Post]!
    scenes: [Scene]!
    arcs: [Tag]!
    universes: [Universe]!
  }

  # Input for asking for nested fields to return
  input TagInclude {
    posts: Boolean
    scenes: Boolean
    arcs: Boolean
    universes: Boolean
  }

  input TagWhere {
    name: String
    type: String
  }

  input CreateTag {
    name: String!
    type: String!
    description: String
  }

  input MutateTag {
    name: String
    type: String
    description: String
  }

  type Query {
    tags(where: TagWhere, include: TagInclude): [Tag]!
    tag(id: ID!, include: TagInclude): Tag
  }

  type Mutation {
    createTag(tag: CreateTag!, include: TagInclude): Tag!
    mutateTag(id: ID!, tag: MutateTag!, include: TagInclude): Tag!
    deleteTag(id: ID!): Tag!
  }

`;