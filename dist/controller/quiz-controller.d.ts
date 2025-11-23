import { NextFunction, Response } from "express";
import { RequestWithUser } from "../lib/jwt";
export declare class QuizController {
    static create(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
    static getAll(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
    static get(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
    static update(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
    static remove(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=quiz-controller.d.ts.map