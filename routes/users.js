import express from "express";
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
import { checkSummary } from "../helpers/summary-middleware";
import { privateUser } from "../helpers/token-middleware";

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

export const users = router;
