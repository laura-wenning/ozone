import { getPrismaClient } from "utilities/server/prisma";

const prisma = getPrismaClient();

interface UserInclude {

}

interface UserWhere {
  id?: string;
  displayName?: string;
}

interface GetUsersArguments {
  where: UserWhere;
  include: UserInclude;
}

interface GetUserArguments {
  id: string;
  include: UserInclude;
}

/**
 * Fetches a list of users
 * @param where The where clause for selecting users 
 * @param include Any related documents to include 
 * @returns An array of users matching the given criteria
 */
async function users(_: unknown, { where, include }: GetUsersArguments) {
  return prisma.user.findMany({
    where: { ...where },
    include,
  });
}

/**
 * Fetches a single user matching the given ID
 * @param id The ID of the user to fetch
 * @param include Any related documents to include 
 * @returns A user document. Null if none is found
 */
async function user(_: unknown, { id, include }: GetUserArguments) {
  return prisma.user.findUnique({ where: { id }, include });
}

export const userResolvers = {
  Query: {
    users,
    user,
  }
}