import arcsData from "../../../../public/data/arcs.json";

interface ArcInclude {

}

interface ArcWhere {
  id?: string;
  universeID?: string;
  name?: string;
}

interface GetArcsArguments {
  where: ArcWhere;
  include: ArcInclude;
}

interface GetArcArguments {
  id: string;
  include: ArcInclude;
}

/**
 * Fetches a list of arcs
 * @param where The where clause for selecting arcs 
 * @param include Any related documents to include 
 * @returns An array of arcs matching the given criteria
 */
async function arcs(_: unknown, { where, include }: GetArcsArguments) {
  return arcsData;
}

/**
 * Fetches a single arc matching the given ID
 * @param id The ID of the arc to fetch
 * @param include Any related documents to include 
 * @returns A arc document. Null if none is found
 */
async function arc(_: unknown, { id, include }: GetArcArguments) {
  for (const arc of arcsData) {
    if (arc.id === id) { return arc; }
  }
  return null;
}

export const arcResolvers = {
  Query: {
    arcs,
    arc,
  }
}