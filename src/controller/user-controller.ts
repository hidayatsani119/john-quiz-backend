import { NextFunction, Request, Response } from "express";
import { RegisterUserRequest } from "../type/user-type";
import { UserService } from "../service/user-service";
import { RequestWithUser } from "../lib/jwt";

export class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const request: RegisterUserRequest = req.body as RegisterUserRequest;
      const response = await UserService.register(request);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const request: RegisterUserRequest = req.body as RegisterUserRequest;
      const response = await UserService.login(request);
      res.status(200).json({
        token: response,
      });
    } catch (error) {
      next(error);
    }
  }
  static async me(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const response = await UserService.me(req.user!);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
  static async update(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const response = await UserService.update(req.user!, req.body);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
