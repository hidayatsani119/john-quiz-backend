"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttemptService = void 0;
const response_error_1 = require("../error/response-error");
const prisma_1 = require("../lib/prisma");
const attempt_validation_1 = require("../validation/attempt-validation");
const validation_1 = require("../validation/validation");
const quiz_service_1 = require("./quiz-service");
class AttemptService {
    static async create(request) {
        const createRequest = validation_1.Validation.validate(attempt_validation_1.AttemptValidation.CREATE, request);
        const quiz = await prisma_1.prisma.quiz.findUnique({
            where: { quizCode: createRequest.quizCode },
        });
        if (!quiz) {
            throw new response_error_1.ResponseError(404, "Quiz not found");
        }
        return await prisma_1.prisma.attempt.create({
            data: {
                quizId: quiz.id,
                studentName: createRequest.studentName,
            },
        });
    }
    static async submitAnswers(attemptId, request) {
        const submitRequest = validation_1.Validation.validate(attempt_validation_1.AttemptValidation.SUBMIT, request);
        const attempt = await prisma_1.prisma.attempt.findUnique({
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
            throw new response_error_1.ResponseError(404, "Attempt not found");
        }
        const answers = request;
        let totalScore = 0;
        const answerDataToInsert = [];
        for (const ans of answers) {
            // Cek question valid
            const question = attempt.quiz.questions.find((q) => q.id === ans.questionId);
            if (!question) {
                throw new response_error_1.ResponseError(400, `Invalid questionId: ${ans.questionId}`);
            }
            // cek option valid
            const option = question.options.find((o) => o.id === ans.selectedOptionId);
            if (!option) {
                throw new response_error_1.ResponseError(400, `Invalid selectedOptionId for question ${question.id}`);
            }
            const isCorrect = option.isCorrect;
            if (isCorrect)
                totalScore += question.points;
            // data for bulk create
            answerDataToInsert.push({
                attemptId,
                questionId: question.id,
                selectedOptionId: option.id,
                isCorrect: isCorrect,
            });
        }
        // Insert many answers
        await prisma_1.prisma.answer.createMany({
            data: answerDataToInsert,
        });
        // Update attempt
        const updateAttempt = await prisma_1.prisma.attempt.update({
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
    static async get(attemptId) {
        const attempt = await prisma_1.prisma.attempt.findUnique({
            where: { id: attemptId },
        });
        if (!attempt) {
            throw new response_error_1.ResponseError(404, "Attempt not found");
        }
        return attempt;
    }
    static async summary(user, quizId) {
        await quiz_service_1.QuizService.checkQuiz(user, quizId);
        const attempts = await prisma_1.prisma.attempt.findMany({
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
exports.AttemptService = AttemptService;
//# sourceMappingURL=attempt-service.js.map