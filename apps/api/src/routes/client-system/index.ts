import { Router } from "express";

import { clientAuthRoutes } from "./client/auth.routes";
import { clientManageVenueRoutes } from "./client/manage-venues.routes";

const router = Router();

router.use("/client", clientAuthRoutes);
router.use("/client/manage-venues", clientManageVenueRoutes);

export const clientSystemRoutes = router;
