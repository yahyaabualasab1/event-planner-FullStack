import { ActorEnum } from "../../enums/models/actor";
import { NotificationEnum } from "../../enums/models/notification";

/** Stored notification fields (MongoDB adds `_id`). */
export interface INotification {
  actorId: string;
  actorType: ActorEnum;
  /** High-level category: booking, message, or system. */
  type: NotificationEnum;
  message: string;
  isRead: boolean;
}
