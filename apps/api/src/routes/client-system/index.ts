import { Router } from "express";

import { clientAuthRoutes } from "./client/auth.routes";
import dashboardRoutes from "./overview/overview.route";

const router = Router();

router.use("/client", clientAuthRoutes);
router.use("/dashboard", dashboardRoutes);

export const clientSystemRoutes = router;
