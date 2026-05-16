import { Router } from "express";
import { clientAuthRoutes } from "./client/auth.routes";
import { clientManageMessagesRoutes } from "./client/manage-messages.routes";

const router = Router();

router.use("/client", clientAuthRoutes);
router.use("/client/manage-messages", clientManageMessagesRoutes);

export const clientSystemRoutes = router;
