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
  validateRequest({ body: createClientSchema }),
  requireAdminAuth,
  async (req, res, next) => {
    try {
      const { name, email, phone } = req.body;
      const client = await createClient({ name, email, phone });
      res.status(201).json(client);
    } catch (error) {
      next(error);
    }
  }
);
//test done
router.get("/", requireAdminAuth, async (req, res, next) => {
  try {
    const clients = await getAllClients();
    res.json(clients);
  } catch (error) {
    next(error);
  }
});

//test done
router.get(
  "/:id",
  validateRequest({ params: idParamSchema }),
  requireAdminAuth,
  async (req, res, next) => {
    try {
      const client = await getClientById(req.params.id);

      if (!client) {
        return res.status(404).json({ error: "Client not found" });
      }

      res.json(client);
    } catch (error) {
      next(error);
    }
  }
);
//test done
router.patch(
  "/:id/status",
  validateRequest({ params: idParamSchema, body: updateStatusSchema }),
  requireAdminAuth,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const updated = await updateClientStatus(id, status);

      if (!updated) {
        return res.status(404).json({ error: "Client not found" });
      }

      return res.json(updated);
    } catch (error) {
      next(error);
    }
  }
);

//test done
router.delete(
  "/:id",
  validateRequest({ params: idParamSchema }),
  requireAdminAuth,
  async (req, res, next) => {
    try {
      const deleted = await DeleteClient(req.params.id);

      if (!deleted) {
        return res.status(404).json({ error: "Client not found" });
      }

      return res.json({ message: "Client deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
