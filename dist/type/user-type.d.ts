export type RegisterUserRequest = {
    name: string;
    email: string;
    password: string;
};
export type LoginUserRequest = {
    email: string;
    password: string;
};
export type updateUserRequest = RegisterUserRequest;
export type UserResponse = {
    name: string;
    email: string;
    createdAt: Date;
};
export declare const toUserResponse: {
    name: boolean;
    email: boolean;
    createdAt: boolean;
};
//# sourceMappingURL=user-type.d.ts.map