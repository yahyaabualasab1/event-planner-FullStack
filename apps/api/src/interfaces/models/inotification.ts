import { ActorType, NotificationType } from "../../enums/models/notification";

/** Stored notification fields (MongoDB adds `_id`). */
export interface INotification {
  actorId: string;
  actorType: ActorType;
  /** High-level category: booking, message, or system. */
  type: NotificationType;
  message: string;
  isRead: boolean;
}
