export type CreateOptionRequest = {
  text: string;
  isCorrect: boolean;
};

export type CreateManyOptionRequest = CreateOptionRequest[];

export type UpdateOptionRequest = CreateOptionRequest;

export type UpdateManyOptionRequest = CreateManyOptionRequest;
