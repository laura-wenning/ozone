import { getPrismaClient } from "utilities/server/prisma";
import { IndividualTagArguments, buildTagArguments, buildUntagArguments } from "src/graphql/utilities/stories";

const prisma = getPrismaClient();

interface SceneInclude {

}

interface SceneWhere {
  id?: string;
  sceneID?: string;
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

interface CreateSceneArguments {
  scene: {
    arcID?: string;
    universeID?: string;
    name: string;
    summary: string;
  }
  include: SceneInclude;
}

interface MutateSceneArguments {
  id: string;
  scene: {
    universeID?: string;
    name?: string;
    summary?: string;
  }
  include: SceneInclude;
}

interface TagSceneArguments {
  id: string;
  tags: IndividualTagArguments;
}

interface UntagSceneArguments {
  id: string;
  tags: string[];
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

/**
 * Creates a new scene
 * @param scene The scene being created
 * @param include Which documents to include when the scene is returned
 * @returns The created scene
 */
 async function createScene(_:unknown, { scene, include }: CreateSceneArguments) {
  const newScene = await prisma.scene.create({
    data: {
      arc: { connect: { id: scene.arcID }},
      name: scene.name,
      summary: scene.summary,
    },
    include,
  });
  return newScene;
}

/**
 * Mutates an scene
 * @param id The ID of the scene to update
 * @param scene The scene fields being updated
 * @param include Which documents to include when the scene is returned
 * @returns The updated actor
 */
async function mutateScene(_: unknown, { id, scene, include }: MutateSceneArguments) {
  let universe;

  // Fetches the actor sheet, if it is being changed
  if (scene.universeID) {
    universe = await prisma.universe.findUnique({ where: { id: scene.universeID }});
    if (!universe) { throw "Error"; }
  }

  return prisma.scene.update({
    data: {
      ...scene as any,
      universe: (universe ? { connect: { id: universe.id }} : undefined),
    },
    include,
    where: { id },
  });
}

/**
 * Allows for deleting an scene
 * @param id The ID of the scene to delete
 * @returns A boolean marking the success
 */
 async function deleteScene(_: unknown, { id }: GetSceneArguments) {
  const scene = await prisma.scene.findUnique({ where: { id } });
  if (!scene) { return false; }
  prisma.scene.delete({ where: { id } });
  return true;
}


/**
 * Tags an scene
 * @param sceneID The ID of the scene to tag
 * @param tagID The ID of the tag to apply to the scene
 * @returns
 */
 async function tagScene(_: unknown, { id, tags }: TagSceneArguments) {
  let existingScene = await prisma.scene.findUnique({ where: { id: id }});
  const tagArguments = buildTagArguments(tags);

  if (!existingScene) { throw `Scene with ID ${id} could not be found`; }

  return prisma.scene.update({
    data: {
      tags: tagArguments
    },
    where: { id },
  });
}

/**
 * Untags an scene
 * @param sceneID The ID of the scene to tag
 * @param tagID The ID of the tag to apply to the scene
 * @returns The updated actor
 */
 async function untagScene(_: unknown, { id, tags }: UntagSceneArguments) {
  let existingScene = await prisma.scene.findUnique({ where: { id: id }});
  const tagArguments = buildUntagArguments(tags);

  if (!existingScene) { throw `Scene with ID ${id} could not be found`; }

  return prisma.scene.update({
    data: {
      tags: tagArguments
    },
    include: { tags: true },
    where: { id },
  });
}

export const sceneResolvers = {
  Query: {
    scenes,
    scene,
  },

  Mutation: {
    createScene,
    mutateScene,
    deleteScene,

    tagScene,
    untagScene,
  }
}