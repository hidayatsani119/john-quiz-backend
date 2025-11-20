import express from "express";
import { errorMiddleware } from "../middleware/error-middleware";
import { TeacherController } from "../controller/teacher-controller";
export const router = express.Router();
router.use(errorMiddleware);
router.post("/api/teacher", TeacherController.create);
//# sourceMappingURL=api.js.map