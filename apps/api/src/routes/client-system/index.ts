import { Router } from "express";

import { clientAuthRoutes } from "./client/auth.routes";

const router = Router();

router.use("/client", clientAuthRoutes);

export const clientSystemRoutes = router;
