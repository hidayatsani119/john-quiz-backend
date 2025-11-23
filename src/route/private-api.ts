import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";

import { QuizController } from "../controller/quiz-controller";
import { QuestionController } from "../controller/question-controller";
import { OptionController } from "../controller/option-controller";
import { UserController } from "../controller/user-controller";
import { AttemptController } from "../controller/attempt-controller";

export const privateRouter = express.Router();

privateRouter.use(authMiddleware);
privateRouter.get("/users/me", UserController.me);
privateRouter.put("/users/me", UserController.update);

privateRouter.post("/quizzes", QuizController.create);
privateRouter.get("/quizzes/:id", QuizController.get);
privateRouter.get("/quizzes", QuizController.getAll);
privateRouter.put("/quizzes/:id", QuizController.update);
privateRouter.delete("/quizzes/:id", QuizController.remove);

privateRouter.post("/quizzes/:quizId/questions", QuestionController.create);
privateRouter.get("/quizzes/:quizId/questions/:questionId", QuestionController.get);
privateRouter.get("/quizzes/:quizId/questions", QuestionController.getAll);
privateRouter.put("/quizzes/:quizId/questions/:questionId", QuestionController.update);
privateRouter.delete("/quizzes/:quizId/questions/:questionId", QuestionController.remove);

privateRouter.post("/quizzes/:quizId/questions/:questionId/options", OptionController.create);
privateRouter.post("/quizzes/:quizId/questions/:questionId/options/bulk", OptionController.createMany);
privateRouter.get("/quizzes/:quizId/questions/:questionId/options/:optionId", OptionController.get);
privateRouter.get("/quizzes/:quizId/questions/:questionId/options", OptionController.getAll);
privateRouter.put("/quizzes/:quizId/questions/:questionId/options/:optionId", OptionController.update);
privateRouter.put("/quizzes/:quizId/questions/:questionId/options/bulk", OptionController.updateMany);
privateRouter.delete("/quizzes/:quizId/questions/:questionId/options/:optionId", OptionController.remove);

privateRouter.get("/quizzes/:quizId/attempts/summary", AttemptController.summary);
privateRouter.get("/quizzes/attempts/:attemptId", AttemptController.get);
