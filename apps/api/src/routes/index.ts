import { Router } from "express";

import { adminAuthRoutes } from "./admin-system/admin/auth.routes";

const router = Router();

router.use("/auth", adminAuthRoutes);

export { router as apiRoutes };

