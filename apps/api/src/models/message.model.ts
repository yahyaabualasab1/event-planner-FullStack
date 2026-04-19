import { Schema, model, Model } from "mongoose";
import { IMessage } from "../interfaces/models/message.interface";
import { MessageEnum } from "../enums/models/message";

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
             required: false
             },
        timestamp: { 
            type: Date,
             required: true
         },
        threadId: { 
            type: String, 
            required: true
         },
         status: {
      type: String,
      enum: Object.values(MessageEnum),
      default: MessageEnum.sent,
    },

    },
    { collection: "messages" }
);

export const Message: Model<IMessage> = model<IMessage>(
    "Message",
    messageSchema
);
export { messageSchema };
export { IMessage } from "../interfaces/models/message.interface";