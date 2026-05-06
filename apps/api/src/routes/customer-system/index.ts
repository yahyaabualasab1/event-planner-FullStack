import { Router } from "express";

import { customerAuthRoutes } from "./customer/auth.routes";

const router = Router();

router.use("/customer", customerAuthRoutes);

export const customerSystemRoutes = router;
