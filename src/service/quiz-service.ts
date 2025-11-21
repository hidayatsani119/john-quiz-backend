import { Quiz } from "../../generated/prisma/client";
import { ResponseError } from "../error/response-error";
import { JwtPayload } from "../lib/jwt";
import { prisma } from "../lib/prisma";
import { CreateQuizRequest, UpdateQuizRequest } from "../type/quiz-type";
import { QuizValidation } from "../validation/quiz-validation";
import { Validation } from "../validation/validation";
import crypto from "crypto";

export class QuizService {
  static async checkQuiz(user: JwtPayload, quizId: number): Promise<Quiz> {
    const quiz = await prisma.quiz.findUnique({
      where: {
        id: quizId,
        userId: user.id,
      },
    });

    if (!quiz) {
      throw new ResponseError(404, "Quiz not found");
    }
    return quiz;
  }

  static async create(user: JwtPayload, request: CreateQuizRequest): Promise<Quiz> {
    const createRequest = Validation.validate(QuizValidation.CREATE, request);
    const isQuizExist = await prisma.quiz.findUnique({
      where: { title: createRequest.title },
    });

    if (isQuizExist) {
      throw new ResponseError(403, "Quiz exist");
    }

    const quizCode = crypto.randomBytes(4).toString("base64url").slice(0, 6).toUpperCase();

    return await prisma.quiz.create({
      data: {
        title: createRequest.title,
        description: createRequest.description,
        quizCode: quizCode,
        userId: user.id,
      },
    });
  }

  static async getAll(user: JwtPayload): Promise<Quiz[]> {
    const quizzes = await prisma.quiz.findMany({
      where: { userId: user.id },
    });

    if (!quizzes) {
      throw new ResponseError(404, "Quiz not found");
    }

    return quizzes;
  }
  static async get(user: JwtPayload, quizId: number) {
    return await this.checkQuiz(user, quizId);
  }

  static async update(user: JwtPayload, quizId: number, request: UpdateQuizRequest): Promise<Quiz> {
    const updateRequest = Validation.validate(QuizValidation.UPDATE, request);
    const quiz = await this.checkQuiz(user, quizId);
    return await prisma.quiz.update({
      where: {
        id: quiz.id,
        userId: quiz.userId,
      },
      data: updateRequest,
    });
  }

  static async remove(user: JwtPayload, quizId: number) {
    const quiz = await this.checkQuiz(user, quizId);
    await prisma.quiz.delete({
      where: {
        id: quiz.id,
        userId: quiz.userId,
      },
    });
  }
}
