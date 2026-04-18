import { type HydratedDocument } from "mongoose";

import { INotification } from "./inotification.js";

export interface NotificationDocument extends HydratedDocument<INotification> {}
