"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionValidation = void 0;
const zod_1 = __importDefault(require("zod"));
class OptionValidation {
    static CREATE = zod_1.default.object({
        text: zod_1.default.string().min(1),
        isCorrect: zod_1.default.boolean().default(false),
    });
    static CREATEMANY = zod_1.default.array(this.CREATE);
    static UPDATE = this.CREATE;
    static UPDATEMANY = this.CREATEMANY;
}
exports.OptionValidation = OptionValidation;
//# sourceMappingURL=option-validation.js.map