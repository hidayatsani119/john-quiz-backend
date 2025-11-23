"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const public_api_1 = require("./public-api");
const error_middleware_1 = require("../middleware/error-middleware");
const private_api_1 = require("./private-api");
exports.router = express_1.default.Router();
exports.router.use(express_1.default.json());
exports.router.use(public_api_1.publicRouter);
exports.router.use(private_api_1.privateRouter);
exports.router.use(error_middleware_1.errorMiddleware);
//# sourceMappingURL=api.js.map