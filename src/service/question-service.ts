import { Question } from "../../generated/prisma/client";
import { ResponseError } from "../error/response-error";
import { JwtPayload } from "../lib/jwt";
import { prisma } from "../lib/prisma";
import { CreateQuestionRequest, UpdateQuestionRequest } from "../type/question-type";
import { QuestionValidation } from "../validation/question-validation";
import { Validation } from "../validation/validation";
import { QuizService } from "./quiz-service";

export class QuestionService {
  static async checkQuestion(user: JwtPayload, quizId: number, questionId: number): Promise<Question> {
    const quiz = await QuizService.checkQuiz(user, quizId);
    const question = await prisma.question.findUnique({
      where: { id: questionId, quizId: quiz.id },
    });

    if (!question) {
      throw new ResponseError(404, "Question not found");
    }

    return question;
  }
  static async create(user: JwtPayload, quizId: number, request: CreateQuestionRequest): Promise<Question> {
    await QuizService.checkQuiz(user, quizId);
    const createRequest = Validation.validate(QuestionValidation.CREATE, request);

    return await prisma.question.create({
      data: {
        quizId: quizId,
        text: createRequest.text,
        points: createRequest.points,
      },
      include: {
        options: true,
      },
    });
  }

  static async get(user: JwtPayload, quizId: number, questionId: number): Promise<Question> {
    return await this.checkQuestion(user, quizId, questionId);
  }
  static async getAll(user: JwtPayload, quizId: number): Promise<Question[]> {
    await QuizService.checkQuiz(user, quizId);
    return await prisma.question.findMany({
      where: { quizId: quizId },
      include: { options: true },
    });
  }

  static async update(
    user: JwtPayload,
    quizId: number,
    questionId: number,
    request: UpdateQuestionRequest
  ): Promise<Question> {
    await QuizService.checkQuiz(user, quizId);
    const updateRequest = Validation.validate(QuestionValidation.UPDATE, request);
    const question = await prisma.question.update({
      where: { id: questionId, quizId: quizId },
      data: updateRequest,
    });

    if (!question) {
      throw new ResponseError(404, "Question not found");
    }

    return question;
  }
  static async remove(user: JwtPayload, quizId: number, questionId: number) {
    return await this.checkQuestion(user, quizId, questionId);
  }
}
