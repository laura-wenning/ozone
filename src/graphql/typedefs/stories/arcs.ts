import { gql } from "apollo-server-micro";


export const arcTypeDefs = gql`
  type Arc {
    id: String # The UUID of this arc in the database
    universeID: String # The universe/world that this arc belongs to

    name: String # The name of this arc
    summary: String # A summary/description of this arc
  }
`;