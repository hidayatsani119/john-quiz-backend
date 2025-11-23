import { JwtPayload } from "../lib/jwt";
import { LoginUserRequest, RegisterUserRequest, UserResponse, updateUserRequest } from "../type/user-type";
export declare class UserService {
    static register(request: RegisterUserRequest): Promise<UserResponse>;
    static login(request: LoginUserRequest): Promise<string>;
    static me(request: JwtPayload): Promise<UserResponse>;
    static update(user: JwtPayload, request: updateUserRequest): Promise<UserResponse>;
}
//# sourceMappingURL=user-service.d.ts.map