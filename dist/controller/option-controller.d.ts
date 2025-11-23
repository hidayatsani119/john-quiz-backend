import { Response, NextFunction } from "express";
import { RequestWithUser } from "../lib/jwt";
export declare class OptionController {
    static create(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
    static createMany(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
    static get(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
    static getAll(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
    static update(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
    static updateMany(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
    static remove(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=option-controller.d.ts.map