"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const response_error_1 = require("../error/response-error");
const jwt_1 = require("../lib/jwt");
const logging_1 = require("../lib/logging");
const prisma_1 = require("../lib/prisma");
const user_type_1 = require("../type/user-type");
const user_validation_1 = require("../validation/user-validation");
const validation_1 = require("../validation/validation");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserService {
    static async register(request) {
        logging_1.logger.debug(request);
        const createRequest = validation_1.Validation.validate(user_validation_1.UserValidation.REGISTER, request);
        const totalUserWithEmail = await prisma_1.prisma.user.count({
            where: { email: createRequest.email },
        });
        const hashedPassword = await bcrypt_1.default.hash(createRequest.password, 10);
        createRequest.password = hashedPassword;
        if (totalUserWithEmail > 0) {
            throw new response_error_1.ResponseError(409, "User is exist");
        }
        return await prisma_1.prisma.user.create({
            data: createRequest,
            select: user_type_1.toUserResponse,
        });
    }
    static async login(request) {
        const loginRequest = validation_1.Validation.validate(user_validation_1.UserValidation.LOGIN, request);
        const User = await prisma_1.prisma.user.findUnique({
            where: { email: loginRequest.email },
        });
        if (!User) {
            throw new response_error_1.ResponseError(404, "email or password wrong");
        }
        const checkPassword = await bcrypt_1.default.compare(loginRequest.password, User.password);
        if (!checkPassword) {
            throw new response_error_1.ResponseError(404, "email or password wrong");
        }
        const token = jwt_1.JwtUtils.sign({ id: User.id, email: User.email });
        return token;
    }
    static async me(request) {
        const user = await prisma_1.prisma.user.findUnique({
            where: { id: request.id },
            select: user_type_1.toUserResponse,
        });
        if (!user) {
            throw new response_error_1.ResponseError(404, "User not found");
        }
        return user;
    }
    static async update(user, request) {
        const updateRequest = validation_1.Validation.validate(user_validation_1.UserValidation.UPDATE, request);
        const hashedPassword = await bcrypt_1.default.hash(updateRequest.password, 10);
        updateRequest.password = hashedPassword;
        return await prisma_1.prisma.user.update({
            where: { id: user.id },
            data: updateRequest,
            select: user_type_1.toUserResponse,
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user-service.js.map