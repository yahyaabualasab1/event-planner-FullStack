
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
  async (req, res) => {
    const { name, email, phone } = req.body;
    const client = await createClient({ name, email, phone });
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
  validateRequest({ params: idParamSchema }),
   requireAdminAuth,
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
  validateRequest({ params: idParamSchema, body: updateStatusSchema }),
   requireAdminAuth,
   async (req, res) => {
    const updated = await updateClientStatus(
      req.params.clientId,
      req.body.status
    );
    if (!updated) {
      return res.status(404).json({ error: "Client not found" });
    }

    res.json(updated);
  }
);

//test done
router.delete(
  "/:id",
  validateRequest({ params: idParamSchema }),
   requireAdminAuth,
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
