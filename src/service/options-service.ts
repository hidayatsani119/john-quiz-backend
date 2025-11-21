import { JwtPayload } from "../lib/jwt";
import { prisma } from "../lib/prisma";
import { CreateManyOptionRequest, CreateOptionRequest } from "../type/option-type";
import { OptionValidation } from "../validation/option-validation";
import { Validation } from "../validation/validation";
import { QuestionService } from "./question-service";

export class OptionService {
  static async create(user: JwtPayload, quizId: number, questionId: number, request: CreateOptionRequest) {
    await QuestionService.chechQuestion(user, quizId, questionId);
    const createRequest = Validation.validate(OptionValidation.CREATE, request);
    return await prisma.option.create({
      data: {
        text: createRequest.text,
        isCorrect: createRequest.isCorrect,
        questionId: questionId,
      },
    });
  }

  static async createMany(user: JwtPayload, quizId: number, questionId: number, request: CreateManyOptionRequest) {
    await QuestionService.chechQuestion(user, quizId, questionId);
    const createRequest = Validation.validate(OptionValidation.CREATEMANY, request);
    return await prisma.option.createMany({
      data: createRequest.map((opt) => ({
        questionId: questionId,
        text: opt.text,
        isCorrect: opt.isCorrect,
      })),
    });
  }

  static async remove(user: JwtPayload, quizId: number, questionId: number, optionId: number) {
    await QuestionService.chechQuestion(user, quizId, questionId);
    return await prisma.option.delete({
      where: { id: optionId, questionId: questionId },
    });
  }
}
