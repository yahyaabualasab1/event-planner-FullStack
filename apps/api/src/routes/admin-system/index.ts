import { Router } from "express";
import { adminAuthRoutes } from "./admin/auth.routes";
import { clientProfileRoutes } from "./client/client-profile.routes";

const router = Router();

router.use("/admin", adminAuthRoutes);
router.use("/client", clientProfileRoutes);

export const adminSystemRoutes = router;
