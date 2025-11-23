"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jwt_1 = require("../lib/jwt");
const response_error_1 = require("../error/response-error");
const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new response_error_1.ResponseError(401, "Missing Authorization header");
        }
        if (!authHeader.startsWith("Bearer ")) {
            throw new response_error_1.ResponseError(400, "Invalid Authorization format");
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            throw new response_error_1.ResponseError(401, "Missing token");
        }
        const payload = jwt_1.JwtUtils.verify(token);
        req.user = payload;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth-middleware.js.map