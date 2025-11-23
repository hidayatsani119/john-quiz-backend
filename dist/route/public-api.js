"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user-controller");
const attempt_controller_1 = require("../controller/attempt-controller");
exports.publicRouter = express_1.default.Router();
exports.publicRouter.post("/users/register", user_controller_1.UserController.register);
exports.publicRouter.post("/users/login", user_controller_1.UserController.login);
exports.publicRouter.post("/attempts/start", attempt_controller_1.AttemptController.create);
exports.publicRouter.post("/attempts/:attemptId/submit", attempt_controller_1.AttemptController.submitAnswers);
//# sourceMappingURL=public-api.js.map