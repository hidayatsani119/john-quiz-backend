import "dotenv/config";
import { Request } from "express";
export interface JwtPayload {
    id: string;
    email: string;
    iat?: number;
    exp?: number;
}
export interface RequestWithUser extends Request {
    user?: JwtPayload;
}
export declare class JwtUtils {
    static sign(payload: Object): string;
    static verify(token: string): Object;
}
//# sourceMappingURL=jwt.d.ts.map