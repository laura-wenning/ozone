import usersData from "../../../public/data/users.json";

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
  return usersData;
}

/**
 * Fetches a single user matching the given ID
 * @param id The ID of the user to fetch
 * @param include Any related documents to include 
 * @returns A user document. Null if none is found
 */
async function user(_: unknown, { id, include }: GetUserArguments) {
  for (const user of usersData) {
    if (user.id === id) { return user; }
  }
  return null;
}

export const userResolvers = {
  Query: {
    users,
    user,
  }
}