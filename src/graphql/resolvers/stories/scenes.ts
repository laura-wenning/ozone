import scenesData from "../../../../public/data/scenes.json";
import { getPrismaClient } from "utilities/server/prisma";

const prisma = getPrismaClient();

interface SceneInclude {

}

interface SceneWhere {
  id?: string;
  arcID?: string;
  name?: string;
}

interface GetScenesArguments {
  where: SceneWhere;
  include: SceneInclude;
}

interface GetSceneArguments {
  id: string;
  include: SceneInclude;
}

/**
 * Fetches a list of scenes
 * @param where The where clause for selecting scenes 
 * @param include Any related documents to include 
 * @returns An array of scenes matching the given criteria
 */
async function scenes(_: unknown, { where, include }: GetScenesArguments) {
  return prisma.scene.findMany({
    where: { ...where },
    include,
  });
}

/**
 * Fetches a single scene matching the given ID
 * @param id The ID of the scene to fetch
 * @param include Any related documents to include 
 * @returns A scene document. Null if none is found
 */
async function scene(_: unknown, { id, include }: GetSceneArguments) {
  return prisma.scene.findUnique({ where: { id }, include });
}

export const sceneResolvers = {
  Query: {
    scenes,
    scene,
  }
}