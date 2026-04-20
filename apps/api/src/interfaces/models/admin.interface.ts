import { Types } from "mongoose";

export interface IAdmin {
  _id: Types.ObjectId;
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  createdAt?: Date;
  updatedAt?: Date;
}
