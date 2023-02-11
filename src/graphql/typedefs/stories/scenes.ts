import { gql } from "apollo-server-micro";

export const scenesTypeDefs = gql`
  # Describes a collection of posts into a scene
  type Scene {
    id: String! # The UUID of this scene in the database
    arc: Scene # The arc that this scene belongs to
    universe: Universe # The world that this scene belongs to
    
    name: String! # The name of this scene
    summary: String! # A summary/description of this scene

    posts: [Post]!
    tags: [Tags]! @relation
  }

  # Input for asking for nested fields to return
  input SceneInclude {
    arc: Boolean
    universe: Boolean
    posts: Boolean
    tags: Boolean
  }

  input CreateScene {
    arcID: String
    universeID: String
    name: String!
    summary: String!
  }

  input MutateScene {
    arcID: String
    universeID: String
    name: String
    summary: String
  }

  type Query {
    scenes(where: SceneWhere, include: SceneInclude): [Scene]!
    scene(id: String!, include: SceneInclude): Scene
  }

  type Mutation {
    createScene(scene: CreateScene!, include: SceneInclude): Scene!
    mutateScene(id: String!, scene: MutateScene!, include: SceneInclude): Scene!
    deleteScene(id: String!): Scene!
  }
`;