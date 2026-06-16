import { Router } from "express";
import { requireAdminAuth } from "../../../middlewares/require-admin-auth.middleware";
import { reportService } from "../../../services/admin-system/reports/report.service";

const router = Router();

router.get("/", requireAdminAuth, async (_req, res, next) => {
  try {
    const reports = await reportService.getAllReports();
    res.status(200).json(reports);
  } catch (error) {
    next(error);
  }
});

export const adminReportRoutes = router;
