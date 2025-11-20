import { TeacherService } from "../service/teacher-service";
export class TeacherController {
    static async create(req, res, next) {
        try {
            const request = req.body;
            const response = await TeacherService.create(request);
            res.status(200).json({
                data: response,
                message: "Teacher created successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }
}
//# sourceMappingURL=teacher-controller.js.map