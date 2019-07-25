import express from "express";
import {
  getToken,
  delToken,
  getTokenById,
} from "../controllers/TokenController";
import { privateUser } from "../middleware/token-middleware";

const router = express.Router();

router
  .get("/", privateUser, getToken)
  .delete("/delete/:id", privateUser, delToken)
  .get("/userToken", privateUser, getTokenById);

export const token = router;
