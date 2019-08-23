import "dotenv/config";
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import cors from "cors";
import model from "./model";

const app = express();

app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    model,
    me: model.data[1]
  }
});

server.applyMiddleware({ app, path: "/graphql" }); // you can opt in any middleware and graphql endpoint

app.listen({ port: process.env.PORT }, () => {
  console.log(
    `Apollo server started on http://localhost:${process.env.PORT}/graphql`
  );
});
