import { Schema, model, type Model } from "mongoose";

import { ActorType, NotificationType } from "../enums/notification.js";
import { INotification } from "../interfaces/inotification.js";

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

export { ActorType, NotificationType } from "../enums/notification.js";
export { INotification } from "../interfaces/inotification.js";
export { NotificationDocument } from "../interfaces/notification-document.js";
