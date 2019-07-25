import express from "express";
import {
  searchSummary,
  getByEmail,
  addSummary,
  delSummary,
  updateSummary,
  addComments,
  deleteComments,
} from "../controllers/SummaryController";
import { privateUser } from "../middleware/token-middleware";
import {
  checkSummaryComments,
  checkSummaryByParams,
} from "../middleware/summary-middleware";

const router = express.Router();

router
  .get("/", searchSummary)
  .get("/getByEmail/:id", privateUser, getByEmail)
  .post("/add", privateUser, addSummary)
  .delete("/delete/:id", privateUser, checkSummaryByParams, delSummary)
  .put("/update/:id", privateUser, updateSummary)
  .put("/addComments/:id", privateUser, addComments)
  .put(
    "/deleteComments/:id",
    privateUser,
    checkSummaryComments,
    deleteComments,
  );

export const summary = router;
