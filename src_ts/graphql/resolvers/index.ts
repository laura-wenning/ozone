import { discordAccountResolvers } from "./discord/discordAccounts";
import { arcResolvers } from "./stories/arcs";
import { postResolvers } from "./stories/posts";
import { sceneResolvers } from "./stories/scenes";
import { tagResolvers } from "./stories/tags";
import { universeResolvers } from "./stories/universes";
import { userResolvers } from "./users";

export const gqlResolvers = [
  discordAccountResolvers,

  arcResolvers,
  postResolvers,
  sceneResolvers,
  tagResolvers,
  universeResolvers,

  userResolvers,
]