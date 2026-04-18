import { type HydratedDocument } from "mongoose";
import { IMessage } from "./massage.interface";
export interface MessageDocument extends HydratedDocument<IMessage> {}
