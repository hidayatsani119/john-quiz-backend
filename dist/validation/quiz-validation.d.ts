import z from "zod";
export declare class QuizValidation {
    static readonly CREATE: z.ZodObject<{
        title: z.ZodString;
        description: z.ZodString;
    }, z.core.$strip>;
    static readonly UPDATE: z.ZodObject<{
        title: z.ZodString;
        description: z.ZodString;
    }, z.core.$strip>;
}
//# sourceMappingURL=quiz-validation.d.ts.map