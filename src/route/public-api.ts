import express from "express";
import { UserController } from "../controller/user-controller";
import { AttemptController } from "../controller/attempt-controller";

export const publicRouter = express.Router();

publicRouter.post("/users/register", UserController.register);
publicRouter.post("/users/login", UserController.login);

publicRouter.post("/attempts/start", AttemptController.create);
publicRouter.post("/attempts/:attemptId/submit", AttemptController.submitAnswers);
