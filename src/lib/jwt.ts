import jwt from "jsonwebtoken";
import "dotenv/config";
import { ResponseError } from "../error/response-error";
import { Request } from "express";

const JWT_SECRET: string = process.env.JWT_SECRET as string; //
const JWT_EXPIRES_IN = "1h";

export interface JwtPayload {
  id: string;
  email: string;
  iat?: number;
  exp?: number;
}

export interface RequestWithUser extends Request {
  user?: JwtPayload;
}

export class JwtUtils {
  static sign(payload: Object): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  }

  static verify(token: string): Object {
    try {
      return jwt.verify(token, JWT_SECRET) as Object;
    } catch (error) {
      throw new ResponseError(400, "Invalid or expired token");
    }
  }
}
