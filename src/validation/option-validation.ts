import z from "zod";

export class OptionValidation {
  static readonly CREATE = z.object({
    text: z.string().min(1),
    isCorrect: z.boolean().default(false),
  });

  static readonly CREATEMANY = z.array(this.CREATE);
}
