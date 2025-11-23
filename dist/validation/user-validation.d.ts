import z from "zod";
export declare class UserValidation {
    static readonly REGISTER: z.ZodObject<{
        name: z.ZodString;
        email: z.ZodEmail;
        password: z.ZodString;
    }, z.core.$strip>;
    static readonly LOGIN: z.ZodObject<{
        email: z.ZodEmail;
        password: z.ZodString;
    }, z.core.$strip>;
    static readonly UPDATE: z.ZodObject<{
        name: z.ZodString;
        email: z.ZodEmail;
        password: z.ZodString;
    }, z.core.$strip>;
}
//# sourceMappingURL=user-validation.d.ts.map