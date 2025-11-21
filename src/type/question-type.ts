export type CreateQuestionRequest = {
  text: string;
  type: "MULTIPLE_CHOICE" | "TRUE_FALSE";
  points: number;
};

export type UpdateQuestionRequest = CreateQuestionRequest;
