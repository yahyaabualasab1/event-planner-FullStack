import { Thread } from "../../../models/thread.model";
import { Message } from "../../../models/message.model";
import { ActorEnum } from "../../../enums/models/actor";
import type { SendManageMessageInput } from "../../../validation/client-system/manage-messages.schemas";

// export async function getThreadsByClientId(clientId: string) {
// 	return await Thread.find({ receiverId: clientId, isDeleted: false })
// 		.sort({ createdAt: -1 })
// 		.populate("senderId");
// }
export async function getThreadsByClientId(clientId: string) {
  const threads = await Thread.find({ receiverId: clientId, isDeleted: false })
    .sort({ updatedAt: -1 })
    .populate("senderId")
    .populate({ path: "venueId", options: { strictPopulate: false } });

  const threadsWithLastMessage = await Promise.all(
    threads.map(async (thread) => {
      const lastMessage = await Message.findOne({
        threadId: thread._id,
        isDeleted: false,
      }).sort({ timestamp: -1 });

      const unreadCount = await Message.countDocuments({
        threadId: thread._id,
        senderId: { $ne: clientId },
        status: { $ne: "read" },
        isDeleted: false,
      });

      return {
        ...thread.toObject(),
        lastMessage: lastMessage
          ? {
              message: lastMessage.message,
              timestamp: lastMessage.timestamp,
              senderId: lastMessage.senderId,
            }
          : null,
        unreadCount,
      };
    }),
  );

  return threadsWithLastMessage;
}

export async function getMessagesByThreadId(threadId: string) {
  return await Message.find({ threadId, isDeleted: false }).sort({
    timestamp: 1,
  });
}

export async function sendManageMessage(data: SendManageMessageInput) {
  const thread = await Thread.findOne({
    _id: data.threadId,
    receiverId: data.clientId,
    isDeleted: false,
  });
  if (!thread) {
    throw new Error("Thread not found");
  }
  const message = new Message({
    senderId: data.clientId,
    actorType: ActorEnum.Client,
    message: data.message,
    threadId: data.threadId,
    timestamp: new Date(),
  });
  return await message.save();
}

export const clientManageMessagesServices = {
  getThreadsByClientId,
  getMessagesByThreadId,
  sendManageMessage,
};
