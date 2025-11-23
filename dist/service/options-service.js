"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionService = void 0;
const prisma_1 = require("../lib/prisma");
const option_validation_1 = require("../validation/option-validation");
const validation_1 = require("../validation/validation");
const question_service_1 = require("./question-service");
const response_error_1 = require("../error/response-error");
class OptionService {
    static async checkOption(questionId, optionId) {
        const option = await prisma_1.prisma.option.findUnique({
            where: { id: optionId, questionId: questionId },
        });
        if (!option) {
            throw new response_error_1.ResponseError(404, "Option not found");
        }
        return option;
    }
    static async create(user, quizId, questionId, request) {
        await question_service_1.QuestionService.checkQuestion(user, quizId, questionId);
        const createRequest = validation_1.Validation.validate(option_validation_1.OptionValidation.CREATE, request);
        return await prisma_1.prisma.option.create({
            data: {
                text: createRequest.text,
                isCorrect: createRequest.isCorrect,
                questionId: questionId,
            },
        });
    }
    static async createMany(user, quizId, questionId, request) {
        await question_service_1.QuestionService.checkQuestion(user, quizId, questionId);
        const createRequest = validation_1.Validation.validate(option_validation_1.OptionValidation.CREATEMANY, request);
        return await prisma_1.prisma.option.createMany({
            data: createRequest.map((opt) => ({
                questionId: questionId,
                text: opt.text,
                isCorrect: opt.isCorrect,
            })),
        });
    }
    static async get(user, quizId, questionId, optionId) {
        await question_service_1.QuestionService.checkQuestion(user, quizId, questionId);
        return await this.checkOption(questionId, optionId);
    }
    static async getAll(user, quizId, questionId) {
        await question_service_1.QuestionService.checkQuestion(user, quizId, questionId);
        return await prisma_1.prisma.option.findMany({
            where: { questionId: questionId },
        });
    }
    static async update(user, quizId, questionId, optionId, request) {
        await question_service_1.QuestionService.checkQuestion(user, quizId, questionId);
        const updateRequest = validation_1.Validation.validate(option_validation_1.OptionValidation.UPDATE, request);
        await this.checkOption(questionId, optionId);
        return await prisma_1.prisma.option.update({
            where: { id: optionId },
            data: updateRequest,
        });
    }
    static async updateMany(user, quizId, questionId, request) {
        await question_service_1.QuestionService.checkQuestion(user, quizId, questionId);
        const updateRequest = validation_1.Validation.validate(option_validation_1.OptionValidation.CREATEMANY, request);
        return await prisma_1.prisma.option.updateMany({
            where: { questionId: questionId },
            data: updateRequest.map((opt) => ({
                questionId: questionId,
                text: opt.text,
                isCorrect: opt.isCorrect,
            })),
        });
    }
    static async remove(user, quizId, questionId, optionId) {
        await question_service_1.QuestionService.checkQuestion(user, quizId, questionId);
        await this.checkOption(questionId, optionId);
        await prisma_1.prisma.option.delete({
            where: { id: optionId, questionId: questionId },
        });
    }
}
exports.OptionService = OptionService;
//# sourceMappingURL=options-service.js.map