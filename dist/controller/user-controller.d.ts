import { NextFunction, Request, Response } from "express";
import { RequestWithUser } from "../lib/jwt";
export declare class UserController {
    static register(req: Request, res: Response, next: NextFunction): Promise<void>;
    static login(req: Request, res: Response, next: NextFunction): Promise<void>;
    static me(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
    static update(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=user-controller.d.ts.map