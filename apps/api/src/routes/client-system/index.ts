import { Router } from "express";

import { clientBookingRoutes } from "./bookings/booking.route";
import { clientAuthRoutes } from "./client/auth.routes";
import dashboardRoutes from "./overview/overview.route";

const router = Router();

router.use("/client", clientAuthRoutes);
router.use("/bookings", clientBookingRoutes);
router.use("/dashboard", dashboardRoutes);

export const clientSystemRoutes = router;
