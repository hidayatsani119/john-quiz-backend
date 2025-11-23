"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttemptController = void 0;
const attempt_service_1 = require("../service/attempt-service");
class AttemptController {
    static async create(req, res, next) {
        try {
            const request = req.body;
            const response = await attempt_service_1.AttemptService.create(request);
            res.status(200).json({
                data: response,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async submitAnswers(req, res, next) {
        try {
            const attemptId = Number(req.params.attemptId);
            const request = req.body;
            const response = await attempt_service_1.AttemptService.submitAnswers(attemptId, request);
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
            const attemptId = Number(req.params.attemptId);
            const response = await attempt_service_1.AttemptService.get(attemptId);
            res.status(200).json({
                data: response,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async summary(req, res, next) {
        try {
            const quizId = Number(req.params.quizId);
            const response = await attempt_service_1.AttemptService.summary(req.user, quizId);
            res.status(200).json({
                data: response,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AttemptController = AttemptController;
//# sourceMappingURL=attempt-controller.js.map