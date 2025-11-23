import { NextFunction, Request, Response } from "express";
import { AttemptService } from "../service/attempt-service";
import { CreateAttemptRequest, SubmitAttemptRequest } from "../type/attempt-type";
import { RequestWithUser } from "../lib/jwt";

export class AttemptController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateAttemptRequest = req.body;
      const response = await AttemptService.create(request);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
  static async submitAnswers(req: Request, res: Response, next: NextFunction) {
    try {
      const attemptId = Number(req.params.attemptId);
      const request: SubmitAttemptRequest[] = req.body;
      const response = await AttemptService.submitAnswers(attemptId, request);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const attemptId = Number(req.params.attemptId);
      const response = await AttemptService.get(attemptId);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async summary(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const quizId = Number(req.params.quizId);
      const response = await AttemptService.summary(req.user!, quizId);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
