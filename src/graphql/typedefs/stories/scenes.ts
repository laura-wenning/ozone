import { gql } from "apollo-server-micro";


export const scenesTypeDefs = gql`
  type Scene {
    id: String # The UUID of this scene in the database
    arcID: String # The arc that this scene belongs to
    universeID: String # The world that this scene belongs to
    
    name: String # The name of this scene
    summary: String # A summary/description of this scene
  }
`;