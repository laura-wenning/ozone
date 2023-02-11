import "reflect-metadata";
import { ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { NextApiRequest, NextApiResponse } from "next";

global.fetch = require("cross-fetch");

// TODO - figure out how to better handle this server. Possibly link with the main server
const apolloServer = new ApolloServer({
  // schema,
  typeDefs: [
    
  ],
  resolvers: [
    
  ],
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
