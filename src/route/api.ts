import express from "express";
import { publicRouter } from "./public-api";
import { errorMiddleware } from "../middleware/error-middleware";
import { privateRouter } from "./private-api";

export const router = express.Router();

router.use(express.json());
router.use(publicRouter);
router.use(privateRouter);
router.use(errorMiddleware);
