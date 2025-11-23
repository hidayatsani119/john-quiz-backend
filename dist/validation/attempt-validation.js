"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttemptValidation = void 0;
const zod_1 = __importDefault(require("zod"));
class AttemptValidation {
    static CREATE = zod_1.default.object({
        quizCode: zod_1.default.string().min(6).max(6),
        studentName: zod_1.default.string().min(1),
    });
    static SUBMIT = zod_1.default.array(zod_1.default.object({
        questionId: zod_1.default.number(),
        selectedOptionId: zod_1.default.number(),
    }));
}
exports.AttemptValidation = AttemptValidation;
//# sourceMappingURL=attempt-validation.js.map