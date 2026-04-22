import { Router } from "express";

import { adminAuthRoutes } from "./admin-system/admin/auth.routes";
import { adminVenueRoutes } from "./admin-system/admin/venues.routes";

const router = Router();

router.use("/auth", adminAuthRoutes);
router.use("/venues", adminVenueRoutes);

export { router as apiRoutes };