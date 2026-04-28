import { verify } from "../api/verify.api";
import { useEffect } from "react";
import { useAuthStore } from "../store/auth.store";
import { useQuery } from "@tanstack/react-query";

export const useVerify = () => {
  const setAdmin = useAuthStore((s) => s.setAdmin);

  const query = useQuery({
    queryKey: ["verify"],
    queryFn: verify,
    retry: false,
  });

  useEffect(() => {
    if (query.isSuccess && query.data) {
      setAdmin(query.data.data.admin);
    }
  }, [query.isSuccess, query.data, setAdmin]);

  return query;
};
