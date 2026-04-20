import { Schema, model, Types } from "mongoose";
import { IThread } from "../interfaces/models/threads.interface";

const threadSchema = new Schema<IThread>({
senderId: { type: Schema.Types.ObjectId, ref: "Customer" },
receiverId: { type: Schema.Types.ObjectId, ref: "Client" },
}, { collection: "threads" });

export const Thread = model("Thread", threadSchema);
export { threadSchema };
