import { Request, Response, NextFunction } from "express";
import { OptionService } from "../service/options-service";
import { CreateManyOptionRequest, CreateOptionRequest } from "../type/option-type";
import { RequestWithUser } from "../lib/jwt";

export class OptionController {
  static async create(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const user = req.user!;
      const questionId = Number(req.params.questionId);
      const quizId = Number(req.params.quizId);
      const request: CreateOptionRequest = req.body;

      const response = await OptionService.create(user, quizId, questionId, request);
      res.status(201).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async createMany(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const user = req.user!;
      const questionId = Number(req.params.questionId);
      const quizId = Number(req.params.quizId);
      const request: CreateManyOptionRequest = req.body;

      const response = await OptionService.createMany(user, quizId, questionId, request);
      res.status(201).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
  static async remove(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const user = req.user!;
      const questionId = Number(req.params.questionId);
      const quizId = Number(req.params.quizId);
      const optionId = Number(req.params.optionId);

      const response = await OptionService.remove(user, quizId, questionId, optionId);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
