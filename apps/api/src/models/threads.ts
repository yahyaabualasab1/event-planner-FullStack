import { Schema, model, type Model } from "mongoose";
import {senderId} from "../interfaces/models/sender.interface";
import { IThread } from "../interfaces/models/threads.interface";
import {receiverId} from "../interfaces/models/receiver.inteerface";

const threadSchema = new Schema<IThread>(
  {
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
  },
  { collection: "threads" }
);

export const Thread: Model<IThread> = model<IThread>("Thread", threadSchema);

export { threadSchema };
export { senderId } from "../interfaces/models/sender.interface";
export { receiverId } from "../interfaces/models/receiver.inteerface";
