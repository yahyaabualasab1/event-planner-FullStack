import { Router } from "express";
const router = Router();
import { getBookingById, getBookingsByClientId, getBookingsByVenueId, getBookingsByCustomerId, getBookingsByStatus, createBooking, updateBooking, deleteBooking, getAllBookings} from "../../../services/admin-system/bookings/booking.services";
import { requireAdminAuth } from "../../../middlewares//require-admin-auth.middleware";
router.get("/", requireAdminAuth, async (req, res) => {
    const bookings = await getAllBookings(req.query.status as any);
    res.json(bookings);
});
router.get("/:id", requireAdminAuth, async (req, res) => {
    const booking = await getBookingById(req.params.id);
    res.json(booking);
});
router.get("/client/:clientId",requireAdminAuth, async (req, res) => {
    const bookings = await getBookingsByClientId(parseInt(req.params.clientId));
    res.json(bookings);
});
router.get("/venue/:venueId",requireAdminAuth, async (req, res) => {
    const bookings = await getBookingsByVenueId(parseInt(req.params.venueId));
    res.json(bookings);
});
router.get("/customer/:customerId",requireAdminAuth, async (req, res) => {
    const bookings = await getBookingsByCustomerId(parseInt(req.params.customerId));
    res.json(bookings);
});
router.get("/status/:status",requireAdminAuth, async (req, res) => {
    const bookings = await getBookingsByStatus(req.params.status as any);
    res.json(bookings);
});
router.post("/", requireAdminAuth, async (req, res) => {
    const newBooking = await createBooking(req.body);
    res.json(newBooking);
});
router.put("/:id", requireAdminAuth, async (req, res) => {
    const updatedBooking = await updateBooking(req.params.id, req.body);
    res.json(updatedBooking);
});
router.delete("/:id", requireAdminAuth, async (req, res) => {
    const deletedBooking = await deleteBooking(req.params.id);
    res.json(deletedBooking);
});
export default router;