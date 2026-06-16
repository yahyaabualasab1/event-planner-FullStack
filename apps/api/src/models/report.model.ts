import { Schema, model } from "mongoose";
import {
  ReportPriorityEnum,
  ReportStatusEnum,
} from "../enums/models/report";
import { IReport } from "../interfaces/models/report.interface";

const reportSchema = new Schema<IReport>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(ReportStatusEnum),
      default: ReportStatusEnum.Pending,
      required: true,
    },
    priority: {
      type: String,
      enum: Object.values(ReportPriorityEnum),
      default: ReportPriorityEnum.Medium,
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { collection: "reports", timestamps: true },
);

export const Report = model("Report", reportSchema);
export { reportSchema };
