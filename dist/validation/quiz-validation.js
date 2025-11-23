"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizValidation = void 0;
const zod_1 = __importDefault(require("zod"));
class QuizValidation {
    static CREATE = zod_1.default.object({
        title: zod_1.default.string().min(1),
        description: zod_1.default.string().min(1),
    });
    static UPDATE = this.CREATE;
}
exports.QuizValidation = QuizValidation;
//# sourceMappingURL=quiz-validation.js.map