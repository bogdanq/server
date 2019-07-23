import express from "express";
import {
  getToken,
  delToken,
  getTokenById,
} from "../controllers/TokenController";
import { privateUser } from "../helpers/token-middleware";

const router = express.Router();

router
  .get("/", getToken)
  .delete("/delete/:id", delToken)
  .get("/userToken", privateUser, getTokenById);

export const token = router;
