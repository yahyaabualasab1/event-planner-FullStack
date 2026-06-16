import {
  ReportPriorityEnum,
  ReportStatusEnum,
} from "../../enums/models/report";

export interface IReport {
  _id: string;
  title: string;
  description: string;
  status: ReportStatusEnum;
  priority: ReportPriorityEnum;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted: boolean;
}
