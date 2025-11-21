import { NextFunction, Response } from "express";
import { RequestWithUser } from "../lib/jwt";
import { CreateQuestionRequest, UpdateQuestionRequest } from "../type/question-type";
import { QuestionService } from "../service/question-service";

export class QuestionController {
  static async create(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const request: CreateQuestionRequest = req.body;
      const quizId = Number(req.params.quizId);
      const response = await QuestionService.create(req.user!, quizId, request);
      res.status(201).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getAll(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const quizId = Number(req.params.quizId);
      const response = await QuestionService.getAll(req.user!, quizId);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
  static async update(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const quizId = Number(req.params.quizId);
      const questionId = Number(req.params.questionId);
      const request: UpdateQuestionRequest = req.body;
      const response = await QuestionService.update(req.user!, quizId, questionId, request);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
  static async remove(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const quizId = Number(req.params.quizId);
      const questionId = Number(req.params.questionId);
      await QuestionService.remove(req.user!, quizId, questionId);
      res.status(200).json({
        data: null,
      });
    } catch (error) {
      next(error);
    }
  }
}
