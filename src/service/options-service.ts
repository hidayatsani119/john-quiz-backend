import { Option } from "../../generated/prisma/client";
import { JwtPayload } from "../lib/jwt";
import { prisma } from "../lib/prisma";
import {
  CreateManyOptionRequest,
  CreateOptionRequest,
  UpdateManyOptionRequest,
  UpdateOptionRequest,
} from "../type/option-type";
import { OptionValidation } from "../validation/option-validation";
import { Validation } from "../validation/validation";
import { QuestionService } from "./question-service";
import { ResponseError } from "../error/response-error";

export class OptionService {
  static async checkOption(questionId: number, optionId: number): Promise<Option> {
    const option = await prisma.option.findUnique({
      where: { id: optionId, questionId: questionId },
    });

    if (!option) {
      throw new ResponseError(404, "Option not found");
    }

    return option;
  }

  static async create(
    user: JwtPayload,
    quizId: number,
    questionId: number,
    request: CreateOptionRequest
  ): Promise<Option> {
    await QuestionService.checkQuestion(user, quizId, questionId);
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
    await QuestionService.checkQuestion(user, quizId, questionId);
    const createRequest = Validation.validate(OptionValidation.CREATEMANY, request);
    return await prisma.option.createMany({
      data: createRequest.map((opt) => ({
        questionId: questionId,
        text: opt.text,
        isCorrect: opt.isCorrect,
      })),
    });
  }

  static async get(user: JwtPayload, quizId: number, questionId: number, optionId: number) {
    await QuestionService.checkQuestion(user, quizId, questionId);
    return await this.checkOption(questionId, optionId);
  }
  static async getAll(user: JwtPayload, quizId: number, questionId: number): Promise<Option[]> {
    await QuestionService.checkQuestion(user, quizId, questionId);
    return await prisma.option.findMany({
      where: { questionId: questionId },
    });
  }

  static async update(
    user: JwtPayload,
    quizId: number,
    questionId: number,
    optionId: number,
    request: UpdateOptionRequest
  ): Promise<Option> {
    await QuestionService.checkQuestion(user, quizId, questionId);
    const updateRequest = Validation.validate(OptionValidation.UPDATE, request);
    await this.checkOption(questionId, optionId);
    return await prisma.option.update({
      where: { id: optionId },
      data: updateRequest,
    });
  }

  static async updateMany(user: JwtPayload, quizId: number, questionId: number, request: UpdateManyOptionRequest) {
    await QuestionService.checkQuestion(user, quizId, questionId);
    const updateRequest = Validation.validate(OptionValidation.CREATEMANY, request);
    return await prisma.option.updateMany({
      where: { questionId: questionId },
      data: updateRequest.map((opt) => ({
        questionId: questionId,
        text: opt.text,
        isCorrect: opt.isCorrect,
      })),
    });
  }

  static async remove(user: JwtPayload, quizId: number, questionId: number, optionId: number) {
    await QuestionService.checkQuestion(user, quizId, questionId);
    await this.checkOption(questionId, optionId);
    await prisma.option.delete({
      where: { id: optionId, questionId: questionId },
    });
  }
}
