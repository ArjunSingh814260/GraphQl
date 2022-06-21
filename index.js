const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const express = require("express");
require("./server/DataBase/index");
const jwt = require("jsonwebtoken");
const typeDefs = require("./server/userSchema/typeDefs");
const resolvers = require("./server/userSchema/resolver");
const http = require("http");
console.log;

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const { authorization } = req.headers;

      if (authorization) {
        const { id } = jwt.verify(authorization, "dahfkasdfdjfsdf");

        return { id };
      }
    },
    csrfPrevention: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({
    app,

    path: "/",
  });

  // Modified server startup
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}
startApolloServer(typeDefs, resolvers);
