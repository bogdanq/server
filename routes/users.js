import express from "express";
import {
  getUsers,
  signUp,
  signIn,
  deleteUser,
  currentUser,
  getSummaries,
  toggleSummary,
  toggleJobs,
} from "../controllers/UserController";
import { checkSummary, checkJobs } from "../middleware/summary-middleware";
import { privateUser } from "../middleware/token-middleware";

const router = express.Router();

router
  .get("/", getUsers)
  .post("/signup", signUp)
  .post("/signin", signIn)
  .delete("/delete/:id", privateUser, deleteUser)
  .get("/current-user", privateUser, currentUser)
  .get("/summaries", privateUser, getSummaries)
  .put("/favoriteJobs", privateUser, checkJobs, toggleJobs)
  .put("/favoriteSummary", privateUser, checkSummary, toggleSummary);

export const users = router;
