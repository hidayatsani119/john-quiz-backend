import { Attempt } from "@prisma/client";
import { ResponseError } from "../error/response-error";
import { JwtPayload } from "../lib/jwt";
import { prisma } from "../lib/prisma";
import { CreateAttemptRequest, SubmitAttemptRequest } from "../type/attempt-type";
import { AttemptValidation } from "../validation/attempt-validation";
import { Validation } from "../validation/validation";
import { QuizService } from "./quiz-service";

export class AttemptService {
  static async create(request: CreateAttemptRequest): Promise<Attempt> {
    const createRequest = Validation.validate(AttemptValidation.CREATE, request);
    const quiz = await prisma.quiz.findUnique({
      where: { quizCode: createRequest.quizCode },
    });
    if (!quiz) {
      throw new ResponseError(404, "Quiz not found");
    }

    return await prisma.attempt.create({
      data: {
        quizId: quiz.id,
        studentName: createRequest.studentName,
      },
    });
  }
  static async submitAnswers(attemptId: number, request: SubmitAttemptRequest[]) {
    const submitRequest = Validation.validate(AttemptValidation.SUBMIT, request);
    const attempt = await prisma.attempt.findUnique({
      where: { id: attemptId },
      include: {
        quiz: {
          include: {
            questions: { include: { options: true } },
          },
        },
      },
    });

    if (!attempt) {
      throw new ResponseError(404, "Attempt not found");
    }

    const answers = request;

    let totalScore = 0;
    const answerDataToInsert = [];

    for (const ans of answers) {
      // Cek question valid
      const question = attempt.quiz.questions.find((q) => q.id === ans.questionId);
      if (!question) {
        throw new ResponseError(400, `Invalid questionId: ${ans.questionId}`);
      }

      // cek option valid
      const option = question.options.find((o) => o.id === ans.selectedOptionId);
      if (!option) {
        throw new ResponseError(400, `Invalid selectedOptionId for question ${question.id}`);
      }

      const isCorrect = option.isCorrect;
      if (isCorrect) totalScore += question.points;

      // data for bulk create
      answerDataToInsert.push({
        attemptId,
        questionId: question.id,
        selectedOptionId: option.id,
        isCorrect: isCorrect,
      });
    }

    // Insert many answers
    await prisma.answer.createMany({
      data: answerDataToInsert,
    });

    // Update attempt
    const updateAttempt = await prisma.attempt.update({
      where: { id: attemptId },
      data: {
        score: totalScore,
        completedAt: new Date(),
      },
    });

    return {
      attemptId: attemptId,
      studentName: updateAttempt.studentName,
      completedAt: updateAttempt.completedAt,
      score: totalScore,
      totalQuestions: attempt.quiz.questions.length,
      correctAnswers: answerDataToInsert.filter((a) => a.isCorrect).length,
    };
  }

  static async get(attemptId: number): Promise<Attempt> {
    const attempt = await prisma.attempt.findUnique({
      where: { id: attemptId },
    });

    if (!attempt) {
      throw new ResponseError(404, "Attempt not found");
    }

    return attempt;
  }

  static async summary(user: JwtPayload, quizId: number) {
    await QuizService.checkQuiz(user, quizId);

    const attempts = await prisma.attempt.findMany({
      where: { quizId: quizId, completedAt: { not: null } },
      orderBy: {
        completedAt: "desc",
      },
    });

    return attempts.map((att) => ({
      attemptId: att.id,
      studentName: att.studentName,
      score: att.score ?? 0,
      completedAt: att.completedAt,
    }));
  }
}
