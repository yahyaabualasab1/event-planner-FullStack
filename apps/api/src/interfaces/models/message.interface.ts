import { MessageEnum } from "../../enums/models/message";
export interface IMessage {
  id: string;
  senderId: string;
  message: string;
  timestamp: Date;
  threadId: string;
  status: MessageEnum;
}