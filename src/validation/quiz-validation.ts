import z from "zod";

export class QuizValidation {
  static readonly CREATE = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
  });

  static readonly UPDATE = this.CREATE;
}
