import { ResponseError } from "../error/response-error";
import { logger } from "../lib/logging";
import { prisma } from "../lib/prisma";
import { TeacherValidation } from "../validation/teacher-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";
export class TeacherService {
    static async create(request) {
        logger.debug(request);
        const createRequest = Validation.validate(TeacherValidation.CREATE, request);
        const isTeacherExist = await prisma.teacher.findUnique({
            where: { email: createRequest.email },
        });
        const hashedPassword = await bcrypt.hash(createRequest.password, 10);
        createRequest.password = hashedPassword;
        if (isTeacherExist) {
            throw new ResponseError(403, "Teacher is exist");
        }
        return await prisma.teacher.create({
            data: createRequest,
            select: {
                password: false,
            },
        });
    }
}
//# sourceMappingURL=teacher-service.js.map