import { Router } from "express";
import { validateRequest } from "../../../middlewares/validate-request.middleware";
import { requireClientAuth } from "../../../middlewares/require-client-auth.middleware";
import { clientManageMessagesServices } from "../../../services/client-system/client/manage-messages.services";
import {
	SendManageMessageSchema,
	SendManageMessageInput,
	MessageThreadIdParamSchema,
	MessageClientIdParamSchema,
} from "../../../validation/client-system/manage-messages.schemas";

const router = Router();

router.get(
	"/client/:clientId",
	validateRequest({ params: MessageClientIdParamSchema }),
	requireClientAuth,
	async (req, res, next) => {
		try {
			const threads = await clientManageMessagesServices.getThreadsByClientId(
				req.params.clientId,
			);
			res.status(200).json(threads);
			return;
		} catch (error) {
			next(error);
			return;
		}
	},
);

router.get(
	"/thread/:threadId",
	validateRequest({ params: MessageThreadIdParamSchema }),
	requireClientAuth,
	async (req, res, next) => {
		try {
			const messages =
				await clientManageMessagesServices.getMessagesByThreadId(
					req.params.threadId,
				);
			res.status(200).json(messages);
			return;
		} catch (error) {
			next(error);
			return;
		}
	},
);

router.post(
	"/",
	validateRequest({ body: SendManageMessageSchema }),
	requireClientAuth,
	async (req, res, next) => {
		try {
			const message = await clientManageMessagesServices.sendManageMessage(
				req.body as SendManageMessageInput,
			);
			res.status(201).json(message);
			return;
		} catch (error) {
			if (error instanceof Error && error.message === "Thread not found") {
				res.status(404).json({ error: "Thread not found" });
				return;
			}
			next(error);
			return;
		}
	},
);

export const clientManageMessagesRoutes = router;
