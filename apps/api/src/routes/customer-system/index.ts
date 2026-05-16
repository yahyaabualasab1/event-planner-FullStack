import { Router } from "express";

import { customerAuthRoutes } from "./customer/auth.routes";
import { customerRegisterRoutes } from "./customer/customer-register.routes";

const router = Router();

router.use("/customer", customerRegisterRoutes);
router.use("/customer", customerAuthRoutes);

export const customerSystemRoutes = router;
