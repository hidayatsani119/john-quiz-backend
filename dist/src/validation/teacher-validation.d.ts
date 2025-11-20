import z from "zod";
export declare class TeacherValidation {
    static readonly CREATE: z.ZodObject<{
        name: z.ZodString;
        email: z.ZodString;
        password: z.ZodString;
    }, z.core.$strip>;
}
//# sourceMappingURL=teacher-validation.d.ts.map