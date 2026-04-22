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

router.get(
	"/",
	requireAdminAuth,
	async (req, res, next) => {
		try {
			const venues = await getAllVenues();
			res.status(200).json(venues);
			return;
		} catch (error) {
			next(error);
			return;
		}
	},
);

router.get(
	"/:id",
	validateRequest({ params: VenueIdParamSchema }),
	requireAdminAuth,
	async (req, res, next) => {
		try {
			const venue = await getVenueById(req.params.id);
			res.status(200).json(venue);
			return;
		} catch (error) {
			if (error instanceof Error && error.message === "Venue not found") {
				res.status(404).json({ error: "Venue not found" });
				return;
			}
			next(error);
			return;
		}
	},
);

router.get(
	"/client/:clientId",
	validateRequest({ params: ClientIdParamSchema }),
	requireAdminAuth,
	async (req, res, next) => {
		try {
			const venues = await getVenuesByClientId(req.params.clientId);
			res.status(200).json(venues);
			return;
		} catch (error) {
			if (
				error instanceof Error &&
				error.message === "No venues found for this client"
			) {
				res.status(404).json({ error: "No venues found for this client" });
				return;
			}
			next(error);
			return;
		}
	},
);

router.post(
	"/",
	validateRequest({ body: CreateVenueSchema }),
	requireAdminAuth,
	async (req, res, next) => {
		try {
			const venue = await createVenue(req.body);
			res.status(201).json(venue);
			return;
		} catch (error) {
			next(error);
			return;
		}
	},
);

router.patch(
	"/:id",
	validateRequest({ params: VenueIdParamSchema, body: UpdateVenueSchema }),
	requireAdminAuth,
	async (req, res, next) => {
		try {
			const venue = await updateVenue(req.params.id, req.body);
			res.status(200).json(venue);
			return;
		} catch (error) {
			if (error instanceof Error && error.message === "Venue not found") {
				res.status(404).json({ error: "Venue not found" });
				return;
			}
			next(error);
			return;
		}
	},
);

router.delete(
	"/:id",
	validateRequest({ params: VenueIdParamSchema }),
	requireAdminAuth,
	async (req, res, next) => {
		try {
			await deleteVenue(req.params.id);
			res.status(200).json({ message: "Venue deleted successfully" });
			return;
		} catch (error) {
			if (error instanceof Error && error.message === "Venue not found") {
				res.status(404).json({ error: "Venue not found" });
				return;
			}
			next(error);
			return;
		}
	},
);

export { router as adminVenueRoutes };