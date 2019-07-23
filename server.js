import express from "express";
import logger from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import passport from "passport";
import { routes } from "./routes";
import mongoose from "mongoose";
import { MONGO_URI } from "./api";

const server = express();

server.use(cors());
server.use(logger("dev"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(passport.initialize());

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true })
  .then(mongodb => mongodb)
  .catch(err => err);

for (let routeName in routes) {
  server.use("/" + routeName, routes[routeName]);
}

export default server;
