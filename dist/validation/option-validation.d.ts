import z from "zod";
export declare class OptionValidation {
    static readonly CREATE: z.ZodObject<{
        text: z.ZodString;
        isCorrect: z.ZodDefault<z.ZodBoolean>;
    }, z.core.$strip>;
    static readonly CREATEMANY: z.ZodArray<z.ZodObject<{
        text: z.ZodString;
        isCorrect: z.ZodDefault<z.ZodBoolean>;
    }, z.core.$strip>>;
    static readonly UPDATE: z.ZodObject<{
        text: z.ZodString;
        isCorrect: z.ZodDefault<z.ZodBoolean>;
    }, z.core.$strip>;
    static readonly UPDATEMANY: z.ZodArray<z.ZodObject<{
        text: z.ZodString;
        isCorrect: z.ZodDefault<z.ZodBoolean>;
    }, z.core.$strip>>;
}
//# sourceMappingURL=option-validation.d.ts.map