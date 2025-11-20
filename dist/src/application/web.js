import express from "express";
import { router } from "../route/api";
export const app = express();
app.use(express.json());
app.use(router);
//# sourceMappingURL=web.js.map