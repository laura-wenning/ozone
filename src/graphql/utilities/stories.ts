import { CreateTag } from "../resolvers/stories/tags";

export type IndividualTagArguments = (string | CreateTag)[];

export function buildTagArguments(tags: IndividualTagArguments) {
  const connect: { id: string }[] = [];
  const create: CreateTag[] = [];
  for (const tag of tags) {
    // Tag ID 
    if (typeof tag === "string") {
      connect.push({ id: tag });
    } else {
      create.push(tag);
    }
  }

  const tagArguments = {
    connect,
    create
  }
  return tagArguments;
}

export function buildUntagArguments(tags: string[]) {
  const disconnect: { id: string }[] = [];
  for (const tag of tags) {
    disconnect.push({ id: tag });
  }
  return { disconnect };
}