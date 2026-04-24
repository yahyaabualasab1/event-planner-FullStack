import { Router } from "express";
import { adminAuthRoutes } from "./admin/auth.routes";
import { clientProfileRoutes } from "./client/client-profile.routes";
import bookingRoutes from "./bookings/booking.route";

const router = Router();

router.use("/admin", adminAuthRoutes);
router.use("/client", clientProfileRoutes);
router.use("/bookings", bookingRoutes);

export const adminSystemRoutes = router;
