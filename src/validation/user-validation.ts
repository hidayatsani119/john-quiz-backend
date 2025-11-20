// export type CreateTeacherRequest = {
//   name: string;
//   email: string;
//   password: string;
// };

import z from "zod";

export class UserValidation {
  static readonly REGISTER = z.object({
    name: z.string().min(1),
    email: z.email().min(1),
    password: z.string().min(6),
  });
  static readonly LOGIN = z.object({
    email: z.email().min(1),
    password: z.string().min(6),
  });

  static readonly UPDATE = this.REGISTER;
}
