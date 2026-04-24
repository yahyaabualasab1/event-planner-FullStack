import { Router } from "express";
import { adminAuthRoutes } from "./admin/auth.routes";
import { clientProfileRoutes } from "./client/client-profile.routes";
import { bookingRoutes } from "./bookings/booking.route";
import { adminVenueRoutes } from "./admin/venues.routes";
import { adminCustomerRoutes } from "./customer/customer.routes";
import { adminClientRoutes } from "./client/client.route";
const router = Router();

router.use("/admin", adminAuthRoutes);
router.use("/client-profile", clientProfileRoutes);
router.use("/bookings", bookingRoutes);
router.use("/venues", adminVenueRoutes);
router.use("/customers", adminCustomerRoutes);
router.use("/client", adminClientRoutes);


export const adminSystemRoutes = router;
