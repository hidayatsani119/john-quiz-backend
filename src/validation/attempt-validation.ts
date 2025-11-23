import z from "zod";

export class AttemptValidation {
  static readonly CREATE = z.object({
    quizCode: z.string().min(6).max(6),
    studentName: z.string().min(1),
  });

  static readonly SUBMIT = z.array(
    z.object({
      questionId: z.number(),
      selectedOptionId: z.number(),
    })
  );
}
