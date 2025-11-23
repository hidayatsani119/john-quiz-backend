import { Attempt } from "@prisma/client";
import { JwtPayload } from "../lib/jwt";
import { CreateAttemptRequest, SubmitAttemptRequest } from "../type/attempt-type";
export declare class AttemptService {
    static create(request: CreateAttemptRequest): Promise<Attempt>;
    static submitAnswers(attemptId: number, request: SubmitAttemptRequest[]): Promise<{
        attemptId: number;
        studentName: string;
        completedAt: Date | null;
        score: number;
        totalQuestions: number;
        correctAnswers: number;
    }>;
    static get(attemptId: number): Promise<Attempt>;
    static summary(user: JwtPayload, quizId: number): Promise<{
        attemptId: number;
        studentName: string;
        score: number;
        completedAt: Date | null;
    }[]>;
}
//# sourceMappingURL=attempt-service.d.ts.map