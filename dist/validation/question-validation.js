"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionValidation = void 0;
const zod_1 = __importDefault(require("zod"));
class QuestionValidation {
    static CREATE = zod_1.default.object({
        text: zod_1.default.string().min(3),
        type: zod_1.default.enum(["MULTIPLE_CHOICE", "TRUE_FALSE"]),
        points: zod_1.default.number(),
    });
    static UPDATE = this.CREATE;
}
exports.QuestionValidation = QuestionValidation;
//# sourceMappingURL=question-validation.js.map