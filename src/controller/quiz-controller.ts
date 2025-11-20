import { NextFunction, Response } from "express";
import { QuizService } from "../service/quiz-service";
import { RequestWithUser } from "../lib/jwt";
import { UpdateQuizRequest } from "../type/quiz-type";

export class QuizController {
  static async create(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const request = req.body;
      const response = await QuizService.create(req.user!, request);
      res.status(201).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const response = await QuizService.getAll(req.user!);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async get(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const quizId = Number(req.params.id);
      const response = await QuizService.get(req.user!, quizId);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const quizId = Number(req.params.id);
      const request: UpdateQuizRequest = req.body;
      const response = await QuizService.update(req.user!, quizId, request);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async remove(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const quizId = Number(req.params.id);
      const response = await QuizService.remove(req.user!, quizId);
      res.status(200).json({
        data: null,
      });
    } catch (error) {
      next(error);
    }
  }
}
