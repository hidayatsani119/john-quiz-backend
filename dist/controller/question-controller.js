"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionController = void 0;
const question_service_1 = require("../service/question-service");
class QuestionController {
    static async create(req, res, next) {
        try {
            const request = req.body;
            const quizId = Number(req.params.quizId);
            const response = await question_service_1.QuestionService.create(req.user, quizId, request);
            res.status(201).json({
                data: response,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async get(req, res, next) {
        try {
            const quizId = Number(req.params.quizId);
            const questionId = Number(req.params.questionId);
            const response = await question_service_1.QuestionService.get(req.user, quizId, questionId);
            res.status(200).json({
                data: response,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async getAll(req, res, next) {
        try {
            const quizId = Number(req.params.quizId);
            const response = await question_service_1.QuestionService.getAll(req.user, quizId);
            res.status(200).json({
                data: response,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async update(req, res, next) {
        try {
            const quizId = Number(req.params.quizId);
            const questionId = Number(req.params.questionId);
            const request = req.body;
            const response = await question_service_1.QuestionService.update(req.user, quizId, questionId, request);
            res.status(200).json({
                data: response,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async remove(req, res, next) {
        try {
            const quizId = Number(req.params.quizId);
            const questionId = Number(req.params.questionId);
            await question_service_1.QuestionService.remove(req.user, quizId, questionId);
            res.status(200).json({
                data: null,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.QuestionController = QuestionController;
//# sourceMappingURL=question-controller.js.map