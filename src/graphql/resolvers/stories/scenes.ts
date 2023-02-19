import scenesData from "../../../../public/data/scenes.json";

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
  return scenesData;
}

/**
 * Fetches a single scene matching the given ID
 * @param id The ID of the scene to fetch
 * @param include Any related documents to include 
 * @returns A scene document. Null if none is found
 */
async function scene(_: unknown, { id, include }: GetSceneArguments) {
  for (const scene of scenesData) {
    if (scene.id === id) { return scene; }
  }
  return null;
}

export const sceneResolvers = {
  Query: {
    scenes,
    scene,
  }
}