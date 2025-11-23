import z from "zod";
export declare class QuestionValidation {
    static readonly CREATE: z.ZodObject<{
        text: z.ZodString;
        type: z.ZodEnum<{
            MULTIPLE_CHOICE: "MULTIPLE_CHOICE";
            TRUE_FALSE: "TRUE_FALSE";
        }>;
        points: z.ZodNumber;
    }, z.core.$strip>;
    static readonly UPDATE: z.ZodObject<{
        text: z.ZodString;
        type: z.ZodEnum<{
            MULTIPLE_CHOICE: "MULTIPLE_CHOICE";
            TRUE_FALSE: "TRUE_FALSE";
        }>;
        points: z.ZodNumber;
    }, z.core.$strip>;
}
//# sourceMappingURL=question-validation.d.ts.map