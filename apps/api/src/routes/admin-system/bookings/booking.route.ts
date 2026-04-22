import { Router } from "express";
const router = Router();
import { getBookingById, getBookingsByClientId, getBookingsByVenueId, getBookingsByCustomerId, getBookingsByStatus, createBooking, updateBooking, deleteBooking, getAllBookings} from "../../../services/admin-system/bookings/booking.services";
import { requireAdminAuth } from "../../../middlewares/require-admin-auth.middleware";
import { validateRequest } from "../../../middlewares/validate-request.middleware";
import { CreateBookingSchema, UpdateBookingSchema, BookingIdParamSchema, ClientIdParamSchema, VenueIdParamSchema, CustomerIdParamSchema, StatusParamSchema, StatusQuerySchema } from "../../../validation/admin-system/booking.schemas";

router.get("/", requireAdminAuth, validateRequest({ query: StatusQuerySchema }), async (req, res) => {
    try {
        const bookings = await getAllBookings(req.query.status as any);
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/:id", requireAdminAuth, validateRequest({ params: BookingIdParamSchema }), async (req, res) => {
    try {
        const booking = await getBookingById(req.params.id);
        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }
        res.json(booking);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/client/:clientId", requireAdminAuth, validateRequest({ params: ClientIdParamSchema }), async (req, res) => {
    try {
        const bookings = await getBookingsByClientId(parseInt(req.params.clientId));
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/venue/:venueId", requireAdminAuth, validateRequest({ params: VenueIdParamSchema }), async (req, res) => {
    try {
        const bookings = await getBookingsByVenueId(parseInt(req.params.venueId));
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/customer/:customerId", requireAdminAuth, validateRequest({ params: CustomerIdParamSchema }), async (req, res) => {
    try {
        const bookings = await getBookingsByCustomerId(parseInt(req.params.customerId));
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/status/:status", requireAdminAuth, validateRequest({ params: StatusParamSchema }), async (req, res) => {
    try {
        const bookings = await getBookingsByStatus(req.params.status as any);
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
router.post("/", requireAdminAuth, validateRequest({ body: CreateBookingSchema }), async (req, res) => {
    try {
        const newBooking = await createBooking(req.body);
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
router.put("/:id", requireAdminAuth, validateRequest({ params: BookingIdParamSchema, body: UpdateBookingSchema }), async (req, res) => {
    try {
        const updatedBooking = await updateBooking(req.params.id, req.body);
        if (!updatedBooking) {
            return res.status(404).json({ error: "Booking not found" });
        }
        res.json(updatedBooking);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
router.delete("/:id", requireAdminAuth, validateRequest({ params: BookingIdParamSchema }), async (req, res) => {
    try {
        const deletedBooking = await deleteBooking(req.params.id);
        if (!deletedBooking) {
            return res.status(404).json({ error: "Booking not found" });
        }
        res.json({ message: "Booking soft deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
export default router;