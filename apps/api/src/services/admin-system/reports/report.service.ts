import { Report } from "../../../models/report.model";

export const getAllReports = async () => {
  return await Report.find({ isDeleted: false }).sort({ createdAt: -1 });
};

export const reportService = {
  getAllReports,
};
