import { Router } from "express";

import { adminAuthRoutes } from "../admin/auth.routes";
import { clientProfileRoutes } from "./client-profile.routes";

const router = Router();

router.use("/auth", adminAuthRoutes);
router.use("/", clientProfileRoutes);

export { router as apiRoutes };

