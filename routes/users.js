import express from "express";
import mongoose from "mongoose";
import {
  getUsers,
  signUp,
  signIn,
  deleteUser,
  currentUser,
  getSummaries,
  toggleSummary,
  getCurrentSummary,
} from "../controllers/UserController";

import { MONGO_URI } from "../hendels/checkUser";
import { privateUser, checkSummary } from "../controllers/helpers";

new Promise((res, rej) => {
  mongoose
    .connect(MONGO_URI, { useNewUrlParser: true })
    .then(mongodb => {
      res(mongodb);
      console.log("connected mongo users");
    })
    .catch(err => {
      console.log("mongo not connect users");
    });
});

const router = express.Router();

router
  .get("/", getUsers)
  .post("/signup", signUp)
  .post("/signin", signIn)
  .delete("/delete/:id", deleteUser)
  .get("/current-user", privateUser, currentUser)
  .get("/summaries", privateUser, getSummaries)
  .put("/favoriteSummary", privateUser, checkSummary, toggleSummary)
  .get("/getCurrentSummary/:id", getCurrentSummary);

export default router;
