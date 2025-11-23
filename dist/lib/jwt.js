"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtUtils = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const response_error_1 = require("../error/response-error");
const JWT_SECRET = process.env.JWT_SECRET; //
const JWT_EXPIRES_IN = "1h";
class JwtUtils {
    static sign(payload) {
        return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    }
    static verify(token) {
        try {
            return jsonwebtoken_1.default.verify(token, JWT_SECRET);
        }
        catch (error) {
            throw new response_error_1.ResponseError(400, "Invalid or expired token");
        }
    }
}
exports.JwtUtils = JwtUtils;
//# sourceMappingURL=jwt.js.map