import { Quiz } from "@prisma/client";
import { JwtPayload } from "../lib/jwt";
import { CreateQuizRequest, UpdateQuizRequest } from "../type/quiz-type";
export declare class QuizService {
    static checkQuiz(user: JwtPayload, quizId: number): Promise<Quiz>;
    static create(user: JwtPayload, request: CreateQuizRequest): Promise<Quiz>;
    static getAll(user: JwtPayload): Promise<Quiz[]>;
    static get(user: JwtPayload, quizId: number): Promise<{
        id: number;
        title: string;
        description: string;
        createdAt: Date;
        quizCode: string;
        updatedAt: Date;
        userId: string;
    }>;
    static update(user: JwtPayload, quizId: number, request: UpdateQuizRequest): Promise<Quiz>;
    static remove(user: JwtPayload, quizId: number): Promise<void>;
}
//# sourceMappingURL=quiz-service.d.ts.map