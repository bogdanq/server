import express from "express";
import { privateUser } from "../middleware/token-middleware";
import { checkJobsByParams } from "../middleware/jobs-middleware";
import {
  addJobs,
  getJobs,
  getJobsByEmail,
  removeJobs,
  getCurrentJobs,
  updateJobs,
} from "../controllers/JobsController";

const router = express.Router();

router
  .get("/", getJobs)
  .get("/getByEmail", privateUser, getJobsByEmail)
  .get("/getCurrentJobs/:id", checkJobsByParams, getCurrentJobs)
  .post("/addJobs", privateUser, addJobs)
  .put("/updateJobs/:id", privateUser, checkJobsByParams, updateJobs)
  .delete("/removeJobs/:id", privateUser, checkJobsByParams, removeJobs);

export const jobs = router;
