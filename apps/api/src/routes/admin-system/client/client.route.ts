import { Router } from "express";
import {
  createClient,
  getAllClients,
  updateClientStatus,
  getClientById,
  DeleteClient,
} from "../../../services/admin-system/client/client.service";
import { validateRequest } from "../../../middlewares/validate-request.middleware";
import { requireAdminAuth } from "../../../middlewares/require-admin-auth.middleware";
import {
  createClientSchema,
  updateStatusSchema,
  idParamSchema,
} from "../../../validation/admin-system/client/client.validation";

const router = Router();

//test done
router.post(
  "/",
  requireAdminAuth,
  validateRequest({ body: createClientSchema }),
  async (req, res) => {
    const client = await createClient(req.body);
    res.status(201).json(client);
  },
);
//test done
router.get("/", requireAdminAuth, async (req, res) => {
  const clients = await getAllClients();
  res.json(clients);
});

//test done
router.get(
  "/:id",
  requireAdminAuth,
  validateRequest({ params: idParamSchema }),
  async (req, res) => {
    try {
      const client = await getClientById(req.params.id);
      res.json(client);
    } catch {
      res.status(404).json({ error: "Client not found" });
    }
  },
);
//test done
router.patch(
  "/:id/status",
  requireAdminAuth,
  validateRequest({ params: idParamSchema, body: updateStatusSchema }),
  async (req, res) => {
    try {
      const updated = await updateClientStatus(req.params.id, req.body.status);
      res.json(updated);
    } catch (err) {
      res.status(404).json({ error: "Client not found" });
    }
  },
);
//test done
router.delete(
  "/:id",
  requireAdminAuth,
  validateRequest({ params: idParamSchema }),
  async (req, res) => {
    try {
      await DeleteClient(req.params.id);
      res.json({ message: "Client deleted successfully" });
    } catch {
      res.status(404).json({ error: "Client not found" });
    }
  },
);

export default router;
