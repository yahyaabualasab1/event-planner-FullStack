import { Schema, model, Types } from "mongoose";
export interface IThread {
  senderId: Types.ObjectId;
  receiverId?: Types.ObjectId; 
}
