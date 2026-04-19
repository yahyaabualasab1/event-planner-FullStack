import { Schema, model, type Model } from "mongoose";

import { IAdmin } from "../interfaces/models/IAdmin.interface";

const adminSchema = new Schema<IAdmin>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
  },
  { collection: "admins" }
);

export const Admin: Model<IAdmin> = model<IAdmin>("Admin", adminSchema);

export { adminSchema };
