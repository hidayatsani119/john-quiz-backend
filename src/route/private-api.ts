import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { TeacherController } from "../controller/user-controller";
import { QuizController } from "../controller/quiz-controller";
import { QuestionController } from "../controller/question-controller";
import { OptionController } from "../controller/option-controller";

export const privateRouter = express.Router();

privateRouter.use(authMiddleware);
privateRouter.get("/users/me", TeacherController.me);
privateRouter.put("/users/me", TeacherController.update);

privateRouter.post("/quizzes", QuizController.create);
privateRouter.get("/quizzes", QuizController.getAll);
privateRouter.get("/quizzes/:id", QuizController.get);
privateRouter.put("/quizzes/:id", QuizController.update);
privateRouter.delete("/quizzes/:id", QuizController.remove);

privateRouter.post("/quizzes/:quizId/questions", QuestionController.create);
privateRouter.get("/quizzes/:quizId/questions", QuestionController.getAll);
privateRouter.put("/quizzes/:quizId/questions/:questionId", QuestionController.update);
privateRouter.delete("/quizzes/:quizId/questions/:questionId", QuestionController.remove);

privateRouter.post("/quizzes/:quizId/questions/:questionId/options", OptionController.create);
privateRouter.post("/quizzes/:quizId/questions/:questionId/options", OptionController.createMany);
