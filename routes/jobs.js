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
  deleteComments,
  addComments,
} from "../controllers/JobsController";

const router = express.Router();

router
  .get("/", getJobs)
  .get("/getByEmail", privateUser, getJobsByEmail)
  .get("/getCurrentJobs/:id", checkJobsByParams, getCurrentJobs)
  .post("/addJobs", privateUser, addJobs)
  .put("/updateJobs/:id", privateUser, checkJobsByParams, updateJobs)
  .put("/addComments/:id", privateUser, checkJobsByParams, addComments)
  .put("/deleteComments/:id", privateUser, checkJobsByParams, deleteComments)
  .delete("/removeJobs/:id", privateUser, checkJobsByParams, removeJobs);

export const jobs = router;
