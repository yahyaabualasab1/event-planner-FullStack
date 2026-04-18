import { Schema, model, type Model } from "mongoose";

import { ActorType, NotificationType } from "../enums/models/notification";
import { INotification } from "../interfaces/models/inotification";

const notificationSchema = new Schema<INotification>(
  {
    actorId: { type: String, required: true },
    actorType: {
      type: String,
      required: true,
      enum: Object.values(ActorType),
    },
    type: {
      type: String,
      required: true,
      enum: Object.values(NotificationType),
    },
    message: { type: String, required: true },
    isRead: { type: Boolean, required: true },
  },
  { collection: "notifications" }
);

export const Notification: Model<INotification> = model<INotification>(
  "Notification",
  notificationSchema
);

export { notificationSchema };

export { ActorType, NotificationType } from "../enums/models/notification";
