import express from "express";
import cors from "cors";
import gql from "graphql-tag";
import resolvers from "./src/resolve/index.js";
import passport from "passport";
import http from "http";
import { configDotenv } from "dotenv";
import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { readFileSync } from "fs";
import { connection } from "./db/connection.js";
import session from "express-session";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import connectMongodbSession from "connect-mongodb-session";
import router from "./router/index.js";
import "./auth/auth.js";

configDotenv();

const PORT = process.env.PORT || 3000;

const app = express();

connection();

const MongoDbSotre = connectMongodbSession(session);

const httpServer = http.createServer(app);

const Store = new MongoDbSotre({
  uri: "mongodb://localhost:5050/Mango",
  collection: "session",
});

app.use(
  session({
    secret: process.env.SECRET,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: Store,
    resave: false,
    saveUninitialized: false,
  })
);

const typeDefs = gql(
  readFileSync("./src/schema.graphql", {
    encoding: "utf-8",
  })
);

const server = new ApolloServer({
  schema: buildSubgraphSchema({
    typeDefs,
    resolvers,
  }),
  context: ({ req, res }) => ({
    req,
    res,
    session: req.session,
  }),
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

// app.use("/api", (req, res, next) => {
//   if (!req.user) {
//     res
//       .status(401)
//       .json({ message: "Erişim engellendi: Yetkilendirme hatası" });
//   } else {
//     next();
//   }
// });

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    const token = jwt.sign({ userId: req.user.id }, process.env.SECRET);
    res.redirect("/callback?token=" + token);
  }
);

app.use("/", router);
// app.use("/api", passport.authenticate("google", { session: true }));

await server.start();

app.use(
  "/api",
  cors(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({
      token: req,
    }),
  })
);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
