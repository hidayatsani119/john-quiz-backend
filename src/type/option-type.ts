export type CreateOptionRequest = {
  text: string;
  isCorrect: boolean;
};

export type CreateManyOptionRequest = CreateOptionRequest[];
