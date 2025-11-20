import { CreateTeacherRequest } from "../type/teacher-type";
export declare class TeacherService {
    static create(request: CreateTeacherRequest): Promise<{
        password: string;
        name: string;
        email: string;
        id: string;
        createdAt: Date;
    }>;
}
//# sourceMappingURL=teacher-service.d.ts.map