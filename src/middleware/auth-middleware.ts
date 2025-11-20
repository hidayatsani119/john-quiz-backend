import { NextFunction, Response } from "express";
import { RequestWithUser } from "../lib/jwt";
import { JwtUtils } from "../lib/jwt";
import { ResponseError } from "../error/response-error";

export const authMiddleware = (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new ResponseError(401, "Missing Authorization header");
    }

    if (!authHeader.startsWith("Bearer ")) {
      throw new ResponseError(400, "Invalid Authorization format");
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new ResponseError(401, "Missing token");
    }

    const payload = JwtUtils.verify(token);
    req.user = payload as RequestWithUser["user"];
    next();
  } catch (error) {
    next(error);
  }
};
