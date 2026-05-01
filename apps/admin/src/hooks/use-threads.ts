import { useQuery } from "@tanstack/react-query";
import { getThreads } from "@/api/threads.api";
import { api } from "@/services/axios";

export const useThreads = () => {
  return useQuery({
    queryKey: ["threads"],
    queryFn: async () => {
      const [threadsRes, customersRes] = await Promise.all([
        getThreads(),
        api.get("/api/admin-system/customers"),
      ]);

      const customers = customersRes.data;
      const threads = threadsRes.data;

      return threads.map((thread: any) => ({
        ...thread,
        senderName:
          customers.find((c: any) => c._id === thread.senderId)?.fullName ??
          "Unknown",
      }));
    },
  });
};