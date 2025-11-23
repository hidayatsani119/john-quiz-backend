"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizController = void 0;
const quiz_service_1 = require("../service/quiz-service");
class QuizController {
    static async create(req, res, next) {
        try {
            const request = req.body;
            const response = await quiz_service_1.QuizService.create(req.user, request);
            res.status(201).json({
                data: response,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async getAll(req, res, next) {
        try {
            const response = await quiz_service_1.QuizService.getAll(req.user);
            res.status(200).json({
                data: response,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async get(req, res, next) {
        try {
            const quizId = Number(req.params.id);
            const response = await quiz_service_1.QuizService.get(req.user, quizId);
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
            const quizId = Number(req.params.id);
            const request = req.body;
            const response = await quiz_service_1.QuizService.update(req.user, quizId, request);
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
            const quizId = Number(req.params.id);
            const response = await quiz_service_1.QuizService.remove(req.user, quizId);
            res.status(200).json({
                data: null,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.QuizController = QuizController;
//# sourceMappingURL=quiz-controller.js.map