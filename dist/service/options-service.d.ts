import { JwtPayload } from "../lib/jwt";
import { CreateManyOptionRequest, CreateOptionRequest, UpdateManyOptionRequest, UpdateOptionRequest } from "../type/option-type";
import { Option } from "@prisma/client";
export declare class OptionService {
    static checkOption(questionId: number, optionId: number): Promise<Option>;
    static create(user: JwtPayload, quizId: number, questionId: number, request: CreateOptionRequest): Promise<Option>;
    static createMany(user: JwtPayload, quizId: number, questionId: number, request: CreateManyOptionRequest): Promise<import(".prisma/client").Prisma.BatchPayload>;
    static get(user: JwtPayload, quizId: number, questionId: number, optionId: number): Promise<{
        id: number;
        questionId: number;
        text: string;
        isCorrect: boolean;
    }>;
    static getAll(user: JwtPayload, quizId: number, questionId: number): Promise<Option[]>;
    static update(user: JwtPayload, quizId: number, questionId: number, optionId: number, request: UpdateOptionRequest): Promise<Option>;
    static updateMany(user: JwtPayload, quizId: number, questionId: number, request: UpdateManyOptionRequest): Promise<import(".prisma/client").Prisma.BatchPayload>;
    static remove(user: JwtPayload, quizId: number, questionId: number, optionId: number): Promise<void>;
}
//# sourceMappingURL=options-service.d.ts.map