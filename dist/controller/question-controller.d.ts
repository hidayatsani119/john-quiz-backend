import { NextFunction, Response } from "express";
import { RequestWithUser } from "../lib/jwt";
export declare class QuestionController {
    static create(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
    static get(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
    static getAll(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
    static update(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
    static remove(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=question-controller.d.ts.map