import express from "express";
import { errorMiddleware } from "../middleware/error-middleware";
import { TeacherController } from "../controller/teacher-controller";
export const router = express.Router();
router.post("/api/teacher", TeacherController.create);
router.use(errorMiddleware);
//# sourceMappingURL=api.js.map