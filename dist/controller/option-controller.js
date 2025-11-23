"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionController = void 0;
const options_service_1 = require("../service/options-service");
class OptionController {
    static async create(req, res, next) {
        try {
            const user = req.user;
            const questionId = Number(req.params.questionId);
            const quizId = Number(req.params.quizId);
            const request = req.body;
            const response = await options_service_1.OptionService.create(user, quizId, questionId, request);
            res.status(201).json({
                data: response,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async createMany(req, res, next) {
        try {
            const user = req.user;
            const questionId = Number(req.params.questionId);
            const quizId = Number(req.params.quizId);
            const request = req.body;
            const response = await options_service_1.OptionService.createMany(user, quizId, questionId, request);
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
            const user = req.user;
            const questionId = Number(req.params.questionId);
            const quizId = Number(req.params.quizId);
            const optionId = Number(req.params.optionId);
            const response = await options_service_1.OptionService.get(user, quizId, questionId, optionId);
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
            const user = req.user;
            const questionId = Number(req.params.questionId);
            const quizId = Number(req.params.quizId);
            const response = await options_service_1.OptionService.getAll(user, quizId, questionId);
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
            const user = req.user;
            const questionId = Number(req.params.questionId);
            const quizId = Number(req.params.quizId);
            const optionId = Number(req.params.optionId);
            const request = req.body;
            const response = await options_service_1.OptionService.update(user, quizId, questionId, optionId, request);
            res.status(200).json({
                data: null,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async updateMany(req, res, next) {
        try {
            const user = req.user;
            const questionId = Number(req.params.questionId);
            const quizId = Number(req.params.quizId);
            const request = req.body;
            const response = await options_service_1.OptionService.updateMany(user, quizId, questionId, request);
            res.status(200).json({
                data: null,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async remove(req, res, next) {
        try {
            const user = req.user;
            const questionId = Number(req.params.questionId);
            const quizId = Number(req.params.quizId);
            const optionId = Number(req.params.optionId);
            const response = await options_service_1.OptionService.remove(user, quizId, questionId, optionId);
            res.status(200).json({
                data: null,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.OptionController = OptionController;
//# sourceMappingURL=option-controller.js.map