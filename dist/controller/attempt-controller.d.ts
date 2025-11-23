import { NextFunction, Request, Response } from "express";
import { RequestWithUser } from "../lib/jwt";
export declare class AttemptController {
    static create(req: Request, res: Response, next: NextFunction): Promise<void>;
    static submitAnswers(req: Request, res: Response, next: NextFunction): Promise<void>;
    static get(req: Request, res: Response, next: NextFunction): Promise<void>;
    static summary(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=attempt-controller.d.ts.map