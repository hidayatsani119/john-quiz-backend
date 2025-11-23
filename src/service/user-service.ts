import { ResponseError } from "../error/response-error";
import { JwtPayload, JwtUtils, RequestWithUser } from "../lib/jwt";
import { logger } from "../lib/logging";
import { prisma } from "../lib/prisma";
import {
  LoginUserRequest,
  RegisterUserRequest,
  UserResponse,
  toUserResponse,
  updateUserRequest,
} from "../type/user-type";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";

export class UserService {
  static async register(request: RegisterUserRequest): Promise<UserResponse> {
    logger.debug(request);
    const createRequest = Validation.validate(UserValidation.REGISTER, request);

    const totalUserWithEmail = await prisma.user.count({
      where: { email: createRequest.email },
    });

    const hashedPassword = await bcrypt.hash(createRequest.password, 10);
    createRequest.password = hashedPassword;

    if (totalUserWithEmail > 0) {
      throw new ResponseError(409, "User is exist");
    }
    return await prisma.user.create({
      data: createRequest,
      select: toUserResponse,
    });
  }

  static async login(request: LoginUserRequest): Promise<string> {
    const loginRequest = Validation.validate(UserValidation.LOGIN, request);

    const User = await prisma.user.findUnique({
      where: { email: loginRequest.email },
    });

    if (!User) {
      throw new ResponseError(404, "email or password wrong");
    }

    const checkPassword = await bcrypt.compare(loginRequest.password, User.password);
    if (!checkPassword) {
      throw new ResponseError(404, "email or password wrong");
    }

    const token = JwtUtils.sign({ id: User.id, email: User.email });

    return token;
  }

  static async me(request: JwtPayload): Promise<UserResponse> {
    const user = await prisma.user.findUnique({
      where: { id: request.id },
      select: toUserResponse,
    });

    if (!user) {
      throw new ResponseError(404, "User not found");
    }
    return user;
  }

  static async update(user: JwtPayload, request: updateUserRequest): Promise<UserResponse> {
    const updateRequest = Validation.validate(UserValidation.UPDATE, request);

    const hashedPassword = await bcrypt.hash(updateRequest.password, 10);
    updateRequest.password = hashedPassword;

    return await prisma.user.update({
      where: { id: user.id },
      data: updateRequest,
      select: toUserResponse,
    });
  }
}
