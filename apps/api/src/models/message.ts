import { Schema, model, Model } from "mongoose";
import { IMessage } from "../interfaces/models/massage.interface";

const messageSchema = new Schema<IMessage>(

    {
        id: {
             type: String,
              required: true
             },
        senderId: {
             type: String, 
             required: true 
            },
        message: { 
            type: String,
             required: true
             },
        timestamp: { 
            type: Date,
             required: true
         },
        threadId: { 
            type: String, 
            required: true
         },
    },
    { collection: "messages" }
);

export const Message: Model<IMessage> = model<IMessage>(
    "Message",
    messageSchema
);
export { messageSchema };
export { IMessage } from "../interfaces/models/massage.interface";