import express from "express";
import { router } from "../route/api";
import cors from "cors";

export const app = express();
app.use(cors());
app.use("/api/", router);
