import { Router } from "express";

import { clientBookingRoutes } from "./bookings/booking.route";
import { clientAuthRoutes } from "./client/auth.routes";

const router = Router();

router.use("/client", clientAuthRoutes);
router.use("/bookings", clientBookingRoutes);

export const clientSystemRoutes = router;
