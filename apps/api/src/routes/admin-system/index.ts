import { Router } from "express";
import { adminAuthRoutes } from "./admin/auth.routes";
import { clientProfileRoutes } from "./client/client-profile.routes";
import { bookingRoutes } from "./bookings/booking.route";
import { adminVenueRoutes } from "./admin/venues.routes";

const router = Router();

router.use("/admin", adminAuthRoutes);
router.use("/client", clientProfileRoutes);
router.use("/bookings", bookingRoutes);
router.use("/venues", adminVenueRoutes);

export const adminSystemRoutes = router;
