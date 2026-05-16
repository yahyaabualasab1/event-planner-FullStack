import { Router } from "express";
import { clientBookingRoutes } from "./bookings/booking.route";
import { clientAuthRoutes } from "./client/auth.routes";
import { clientManageVenueRoutes } from "./client/manage-venues.routes";
import dashboardRoutes from "./overview/overview.route";

const router = Router();

router.use("/client", clientAuthRoutes);
router.use("/client/manage-venues", clientManageVenueRoutes);
router.use("/bookings", clientBookingRoutes);
router.use("/dashboard", dashboardRoutes);

export const clientSystemRoutes = router;
