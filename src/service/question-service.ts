import { Quiestion } from "../../generated/prisma/client";
import { ResponseError } from "../error/response-error";
import { JwtPayload } from "../lib/jwt";
import { prisma } from "../lib/prisma";
import { CreateQuestionRequest, UpdateQuestionRequest } from "../type/question-type";
import { QuestionValidation } from "../validation/question-validation";
import { Validation } from "../validation/validation";
import { QuizService } from "./quiz-service";

export class QuestionService {
  static async create(user: JwtPayload, quizId: number, request: CreateQuestionRequest): Promise<Quiestion> {
    const quiz = await QuizService.checkQuiz(user, quizId);
    const createRequest = Validation.validate(QuestionValidation.CREATE, request);

    return await prisma.quiestion.create({
      data: {
        quizId: quiz.id,
        text: createRequest.text,
        points: createRequest.points,
      },
      include: {
        options: true,
      },
    });
  }
  static async getAll(user: JwtPayload, quizId: number): Promise<Quiestion[]> {
    const quiz = await QuizService.checkQuiz(user, quizId);
    return await prisma.quiestion.findMany({
      where: { quizId: quiz.id },
      include: { options: true },
    });
  }

  static async update(
    user: JwtPayload,
    quizId: number,
    questionId: number,
    request: UpdateQuestionRequest
  ): Promise<Quiestion> {
    const quiz = await QuizService.checkQuiz(user, quizId);
    const updateRequest = Validation.validate(QuestionValidation.UPDATE, request);
    const question = await prisma.quiestion.update({
      where: { id: questionId, quizId: quiz.id },
      data: updateRequest,
    });

    if (!question) {
      throw new ResponseError(404, "Question not found");
    }

    return question;
  }
  static async remove(user: JwtPayload, quizId: number, questionId: number) {
    const quiz = await QuizService.checkQuiz(user, quizId);
    return await prisma.quiestion.delete({
      where: { id: questionId, quizId: quiz.id },
    });
  }
}
