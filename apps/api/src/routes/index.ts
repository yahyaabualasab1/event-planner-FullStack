import { Router } from "express";

import { adminAuthRoutes } from "./admin-system/admin/auth.routes";
import { adminCustomerRoutes } from "./admin-system/customer/customer.routes";
import { adminVenueRoutes } from "./admin-system/admin/venues.routes";
import bookingRoutes from "./admin-system/bookings/booking.route";

const router = Router();

router.use("/auth", adminAuthRoutes);
router.use("/venues", adminVenueRoutes);
router.use("/customers", adminCustomerRoutes);
router.use("/bookings", bookingRoutes);

export { router as apiRoutes };
