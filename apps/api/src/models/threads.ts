import { Schema, model } from "mongoose";
import { IThread } from "../interfaces/models/threads.interface";

const threadSchema = new Schema<IThread>({
    senderId: { type: String, required: true , ref: "Customer" },
    receiverId: { type: String, required: false , ref: "Client" },
}, { collection: "threads" });

export const Thread = model("Thread", threadSchema);
export { threadSchema };
