import { CreateTag } from "../resolvers/stories/tags";

export interface IndividualTagArguments { 
  connect?: string[];
  create?: CreateTag[]
};

export function buildTagArguments(tags: IndividualTagArguments) {
  const connect: { id: string }[] = [];
  const create: CreateTag[] = [];

  for (const tag of tags.connect || []) {
    connect.push({ id: tag });
  }

  for (const tag of tags.create || []) {
    create.push(tag);
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