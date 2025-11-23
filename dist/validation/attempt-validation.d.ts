import z from "zod";
export declare class AttemptValidation {
    static readonly CREATE: z.ZodObject<{
        quizCode: z.ZodString;
        studentName: z.ZodString;
    }, z.core.$strip>;
    static readonly SUBMIT: z.ZodArray<z.ZodObject<{
        questionId: z.ZodNumber;
        selectedOptionId: z.ZodNumber;
    }, z.core.$strip>>;
}
//# sourceMappingURL=attempt-validation.d.ts.map