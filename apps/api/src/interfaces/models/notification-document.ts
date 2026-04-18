import { type HydratedDocument } from "mongoose";

import { INotification } from "./inotification";

export interface NotificationDocument extends HydratedDocument<INotification> {}
