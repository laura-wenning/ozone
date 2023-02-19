import { discordAccountTypeDefs } from "./discord/discordAccounts";
import { arcTypeDefs } from "./stories/arcs";
import { postTypeDefs } from "./stories/posts";
import { sceneTypeDefs } from "./stories/scenes";
import { tagTypeDefs } from "./stories/tags";
import { universeTypeDefs } from "./stories/universes";
import { userTypeDefs } from "./users";

export const gqlTypeDefs = [
  discordAccountTypeDefs,
  arcTypeDefs,
  postTypeDefs,
  sceneTypeDefs,
  tagTypeDefs,
  universeTypeDefs,
  userTypeDefs,
];