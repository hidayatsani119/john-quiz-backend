// export type CreateTeacherRequest = {
//   name: string;
//   email: string;
//   password: string;
// };
import z from "zod";
export class TeacherValidation {
    static CREATE = z.object({
        name: z.string().min(1),
        email: z.string().min(1),
        password: z.string().min(6),
    });
}
//# sourceMappingURL=teacher-validation.js.map