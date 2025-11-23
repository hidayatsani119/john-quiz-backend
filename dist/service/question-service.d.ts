import { Question } from "@prisma/client";
import { JwtPayload } from "../lib/jwt";
import { CreateQuestionRequest, UpdateQuestionRequest } from "../type/question-type";
export declare class QuestionService {
    static checkQuestion(user: JwtPayload, quizId: number, questionId: number): Promise<Question>;
    static create(user: JwtPayload, quizId: number, request: CreateQuestionRequest): Promise<Question>;
    static get(user: JwtPayload, quizId: number, questionId: number): Promise<Question>;
    static getAll(user: JwtPayload, quizId: number): Promise<Question[]>;
    static update(user: JwtPayload, quizId: number, questionId: number, request: UpdateQuestionRequest): Promise<Question>;
    static remove(user: JwtPayload, quizId: number, questionId: number): Promise<{
        type: import(".prisma/client").$Enums.QuestionType;
        id: number;
        quizId: number;
        text: string;
        points: number;
    }>;
}
//# sourceMappingURL=question-service.d.ts.map