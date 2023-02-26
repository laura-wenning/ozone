import "reflect-metadata";
import { ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { NextApiRequest, NextApiResponse } from "next";
import { gqlTypeDefs } from "../../graphql/typedefs";
import { gqlResolvers } from "../../graphql/resolvers";

global.fetch = require("cross-fetch");

// TODO - figure out how to better handle this server. Possibly link with the main server
const apolloServer = new ApolloServer({
  // schema,
  typeDefs: gqlTypeDefs,
  resolvers: gqlResolvers,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
  context: ({req, res}) => {
    // initializeNextContext({req, res});
    // Auth.fromReq(req);

    return {
      session: null,
      req,
      res,
    };
  },
});

const server = apolloServer.start();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  await server;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}
export const config = {
  api: {
    bodyParser: false,
  },
};
