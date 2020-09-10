import { request } from "graphql-request";

const URL = "http://graphql-server_web_1:3000/graphql";

export async function queryGQL(gql: string) {
  const res = await request(URL, gql);
  return res;
}