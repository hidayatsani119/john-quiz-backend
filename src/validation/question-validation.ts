import z from "zod";

export class QuestionValidation {
  static readonly CREATE = z.object({
    text: z.string().min(3),
    type: z.enum(["MULTIPLE_CHOICE", "TRUE_FALSE"]),
    points: z.number(),
  });
  static readonly UPDATE = this.CREATE;
}
