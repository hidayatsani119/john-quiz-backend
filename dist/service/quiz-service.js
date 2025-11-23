"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizService = void 0;
const response_error_1 = require("../error/response-error");
const prisma_1 = require("../lib/prisma");
const quiz_validation_1 = require("../validation/quiz-validation");
const validation_1 = require("../validation/validation");
const crypto_1 = __importDefault(require("crypto"));
class QuizService {
    static async checkQuiz(user, quizId) {
        const quiz = await prisma_1.prisma.quiz.findUnique({
            where: {
                id: quizId,
                userId: user.id,
            },
        });
        if (!quiz) {
            throw new response_error_1.ResponseError(404, "Quiz not found");
        }
        return quiz;
    }
    static async create(user, request) {
        const createRequest = validation_1.Validation.validate(quiz_validation_1.QuizValidation.CREATE, request);
        const isQuizExist = await prisma_1.prisma.quiz.findUnique({
            where: { title: createRequest.title },
        });
        if (isQuizExist) {
            throw new response_error_1.ResponseError(409, "Quiz exist");
        }
        const quizCode = crypto_1.default.randomBytes(4).toString("base64url").slice(0, 6).toUpperCase();
        return await prisma_1.prisma.quiz.create({
            data: {
                title: createRequest.title,
                description: createRequest.description,
                quizCode: quizCode,
                userId: user.id,
            },
        });
    }
    static async getAll(user) {
        const quizzes = await prisma_1.prisma.quiz.findMany({
            where: { userId: user.id },
        });
        if (!quizzes) {
            throw new response_error_1.ResponseError(404, "Quiz not found");
        }
        return quizzes;
    }
    static async get(user, quizId) {
        return await this.checkQuiz(user, quizId);
    }
    static async update(user, quizId, request) {
        const updateRequest = validation_1.Validation.validate(quiz_validation_1.QuizValidation.UPDATE, request);
        const quiz = await this.checkQuiz(user, quizId);
        return await prisma_1.prisma.quiz.update({
            where: {
                id: quiz.id,
                userId: quiz.userId,
            },
            data: updateRequest,
        });
    }
    static async remove(user, quizId) {
        await this.checkQuiz(user, quizId);
        await prisma_1.prisma.quiz.delete({
            where: {
                id: quizId,
                userId: user.id,
            },
        });
    }
}
exports.QuizService = QuizService;
//# sourceMappingURL=quiz-service.js.map