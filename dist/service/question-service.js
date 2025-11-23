"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionService = void 0;
const response_error_1 = require("../error/response-error");
const prisma_1 = require("../lib/prisma");
const question_validation_1 = require("../validation/question-validation");
const validation_1 = require("../validation/validation");
const quiz_service_1 = require("./quiz-service");
class QuestionService {
    static async checkQuestion(user, quizId, questionId) {
        const quiz = await quiz_service_1.QuizService.checkQuiz(user, quizId);
        const question = await prisma_1.prisma.question.findUnique({
            where: { id: questionId, quizId: quiz.id },
        });
        if (!question) {
            throw new response_error_1.ResponseError(404, "Question not found");
        }
        return question;
    }
    static async create(user, quizId, request) {
        await quiz_service_1.QuizService.checkQuiz(user, quizId);
        const createRequest = validation_1.Validation.validate(question_validation_1.QuestionValidation.CREATE, request);
        return await prisma_1.prisma.question.create({
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
    static async get(user, quizId, questionId) {
        return await this.checkQuestion(user, quizId, questionId);
    }
    static async getAll(user, quizId) {
        await quiz_service_1.QuizService.checkQuiz(user, quizId);
        return await prisma_1.prisma.question.findMany({
            where: { quizId: quizId },
            include: { options: true },
        });
    }
    static async update(user, quizId, questionId, request) {
        await quiz_service_1.QuizService.checkQuiz(user, quizId);
        const updateRequest = validation_1.Validation.validate(question_validation_1.QuestionValidation.UPDATE, request);
        const question = await prisma_1.prisma.question.update({
            where: { id: questionId, quizId: quizId },
            data: updateRequest,
        });
        if (!question) {
            throw new response_error_1.ResponseError(404, "Question not found");
        }
        return question;
    }
    static async remove(user, quizId, questionId) {
        return await this.checkQuestion(user, quizId, questionId);
    }
}
exports.QuestionService = QuestionService;
//# sourceMappingURL=question-service.js.map