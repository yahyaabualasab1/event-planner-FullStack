import { int } from "zod";
import {senderId} from "./sender.interface";
import {receiverId} from "./receiver.inteerface";
export interface IThread {
    senderId: senderId;
    receiverId: receiverId;
}
