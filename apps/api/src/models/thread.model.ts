import { Schema, model, Types } from "mongoose";
import { IThread } from "../interfaces/models/threads.interface";

const threadSchema = new Schema<IThread>(
  {
    senderId: { type: String, ref: "Customer" },
    receiverId: { type: String, ref: "Client" },
  },
  { collection: "threads" },
);

export const Thread = model("Thread", threadSchema);
export { threadSchema };
