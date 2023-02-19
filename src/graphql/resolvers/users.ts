import users from "../../../public/data/users.json";

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
async function getUsers(_: unknown, { where, include }: GetUsersArguments) {
  return users;
}

/**
 * Fetches a single user matching the given ID
 * @param id The ID of the user to fetch
 * @param include Any related documents to include 
 * @returns A user document. Null if none is found
 */
async function getUser(_: unknown, { id, include }: GetUserArguments) {
  for (const user of users) {
    if (user.id === id) { return user; }
  }
  return null;
}

export const userResolvers = {
  Query: {
    getUsers,
    getUser,
  }
}