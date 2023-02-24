import { gql } from "apollo-server-micro";

export const sceneTypeDefs = gql`
  # Describes a collection of posts into a scene
  type Scene {
    id: ID! # The UUID of this scene in the database
    arc: Scene # The arc that this scene belongs to
    universe: Universe # The world that this scene belongs to
    
    name: String! # The name of this scene
    summary: String! # A summary/description of this scene

    posts: [Post]!
    tags: [Tag]!
  }

  # Input for asking for nested fields to return
  input SceneInclude {
    arc: Boolean
    universe: Boolean
    posts: Boolean
    tags: Boolean
  }

  input SceneWhere {
    arcID: ID
    name: String
  }

  input CreateScene {
    arcID: ID
    universeID: ID
    name: String!
    summary: String!
  }

  input MutateScene {
    arcID: ID
    universeID: ID
    name: String
    summary: String
  }

  type Query {
    scenes(where: SceneWhere, include: SceneInclude): [Scene]!
    scene(id: ID!, include: SceneInclude): Scene
  }

  type Mutation {
    createScene(scene: CreateScene!, include: SceneInclude): Scene!
    mutateScene(id: ID!, scene: MutateScene!, include: SceneInclude): Scene!
    deleteScene(id: ID!): Scene!

    tagScene(sceneID: ID!, tagID: ID!): Scene!
    untagScene(sceneID: ID!, tagID: ID!): Scene!
  }
`;