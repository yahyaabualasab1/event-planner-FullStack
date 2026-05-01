import { useQuery } from "@tanstack/react-query";
import { getThreads } from "@/api/threads.api";

export const useThreads = () => {
  return useQuery({
    queryKey: ["threads"],
    queryFn: async () => {
      const res = await getThreads();
      return res.data;
    },
  });
};