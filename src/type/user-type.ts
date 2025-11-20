// model User {
//   id        String   @id @default(uuid())
//   name      String
//   email     String   @unique
//   password  String
//   createdAt DateTime @default(now())

//   @@map("Users")
// }
export type RegisteUserRequest = {
  name: string;
  email: string;
  password: string;
};

export type LoginUserRequest = {
  email: string;
  password: string;
};

export type updateUserRequest = RegisteUserRequest;

export type UserResponse = {
  name: string;
  email: string;
  createdAt: Date;
};

export const toUserResponse = {
  name: true,
  email: true,
  createdAt: true,
};
