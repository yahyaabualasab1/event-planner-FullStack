import { useQuery } from "@tanstack/react-query";
import { getThreads } from "@/api/threads.api";
import { api } from "@/services/axios";

export const useThreads = () => {
  return useQuery({
    queryKey: ["threads"],
    queryFn: async () => {
      const res = await getThreads();
      const threads = res.data;

      const threadsWithLastMessage = await Promise.all(
        threads.map(async (thread: any) => {
          try {
            const msgRes = await api.get(
              `/api/admin-system/messages/thread/${thread._id}`,
            );
            const messages = msgRes.data;
            const lastMessage = messages[messages.length - 1];
            const lastMessageTime = lastMessage
              ? new Date(lastMessage.timestamp).getTime()
              : 0;
            const isOnline = Date.now() - lastMessageTime < 5 * 60 * 1000;

            return {
              ...thread,
              lastMessage: lastMessage?.message ?? "",
              isOnline,
            };
          } catch {
            return { ...thread, lastMessage: "", isOnline: false };
          }
        }),
      );

      return threadsWithLastMessage;
    },
    refetchInterval: 30000,
  });
};