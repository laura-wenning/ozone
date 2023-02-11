import { gql } from "apollo-server-micro";

// Users are people who are able to log in an access Ozone
export const userTypeDefs = gql`
  type User {
    id: String
    displayName: String
  }
`;