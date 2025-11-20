import express from "express";
import { TeacherController } from "../controller/user-controller";

export const publicRouter = express.Router();

publicRouter.post("/users/register", TeacherController.register);
publicRouter.post("/users/login", TeacherController.login);
