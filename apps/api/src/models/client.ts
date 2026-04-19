import { Schema, model, type Model } from "mongoose";

import { IClient, ClientStatus } from "../interfaces/models/client.interface";

const clientSchema = new Schema<IClient>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: Object.values(ClientStatus),
      default: ClientStatus.WAITING_APPROVE,
    },
  },
  { 
    collection: "users",
    timestamps: true,
  }
);

export const Client: Model<IClient> = model<IClient>(
  "Client",
  clientSchema
);

export { clientSchema };

export { ClientStatus } from "../interfaces/models/client.interface";
