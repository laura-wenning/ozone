import { gql } from "apollo-server-micro";
import { discordAccountTypeDefs } from "./discord/discordAccounts";
import { arcTypeDefs } from "./stories/arcs";
import { postTypeDefs } from "./stories/posts";
import { sceneTypeDefs } from "./stories/scenes";
import { tagTypeDefs } from "./stories/tags";
import { universeTypeDefs } from "./stories/universes";
import { userTypeDefs } from "./users";

const coreTypeDefs = gql`
  scalar Date
`;

export const gqlTypeDefs = [
  coreTypeDefs,

  discordAccountTypeDefs,

  arcTypeDefs,
  postTypeDefs,
  sceneTypeDefs,
  tagTypeDefs,
  universeTypeDefs,
  
  userTypeDefs,
];