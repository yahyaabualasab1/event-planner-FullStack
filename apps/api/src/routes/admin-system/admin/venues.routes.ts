import { Router } from "express";

import { requireAdminAuth } from "../../../middlewares/require-admin-auth.middleware";
import { validateRequest } from "../../../middlewares/validate-request.middleware";
import {
	createVenue,
	deleteVenue,
	getAllVenues,
	getVenueById,
	getVenuesByClientId,
	updateVenue,
} from "../../../services/admin-system/admin/venues.services";
import {
	ClientIdParamSchema,
	CreateVenueSchema,
	UpdateVenueSchema,
	VenueIdParamSchema,
} from "../../../validation/admin-system/venues.schemas";

const router = Router();

// GET /venues
router.get("/", requireAdminAuth, async (_req, res, next) => {
	try {
		const venues = await getAllVenues();
		res.status(200).json(venues);
	} catch (error) {
		next(error);
	}
});

// GET /venues/:id
router.get(
	"/:id",
	requireAdminAuth,
	validateRequest({ params: VenueIdParamSchema }),
	async (req, res, next) => {
		try {
			const venue = await getVenueById(req.params.id);
			res.status(200).json(venue);
		} catch (error) {
			if (error instanceof Error && error.message === "Venue not found") {
				res.status(404).json({ error: "Venue not found" });
				return;
			}
			next(error);
		}
	},
);

// GET /venues/client/:clientId
router.get(
	"/client/:clientId",
	requireAdminAuth,
	validateRequest({ params: ClientIdParamSchema }),
	async (req, res, next) => {
		try {
			const venues = await getVenuesByClientId(req.params.clientId);
			res.status(200).json(venues);
		} catch (error) {
			if (
				error instanceof Error &&
				error.message === "No venues found for this client"
			) {
				res.status(404).json({ error: "No venues found for this client" });
				return;
			}
			next(error);
		}
	},
);

// POST /venues
router.post(
	"/",
	requireAdminAuth,
	validateRequest({ body: CreateVenueSchema }),
	async (req, res, next) => {
		try {
			const venue = await createVenue(req.body);
			res.status(201).json(venue);
		} catch (error) {
			next(error);
		}
	},
);

// PATCH /venues/:id
router.patch(
	"/:id",
	requireAdminAuth,
	validateRequest({ params: VenueIdParamSchema, body: UpdateVenueSchema }),
	async (req, res, next) => {
		try {
			const venue = await updateVenue(req.params.id, req.body);
			res.status(200).json(venue);
		} catch (error) {
			if (error instanceof Error && error.message === "Venue not found") {
				res.status(404).json({ error: "Venue not found" });
				return;
			}
			next(error);
		}
	},
);

// DELETE /venues/:id
router.delete(
	"/:id",
	requireAdminAuth,
	validateRequest({ params: VenueIdParamSchema }),
	async (req, res, next) => {
		try {
			await deleteVenue(req.params.id);
			res.status(200).json({ message: "Venue deleted successfully" });
		} catch (error) {
			if (error instanceof Error && error.message === "Venue not found") {
				res.status(404).json({ error: "Venue not found" });
				return;
			}
			next(error);
		}
	},
);

export { router as adminVenueRoutes };