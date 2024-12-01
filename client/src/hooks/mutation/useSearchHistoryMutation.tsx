import { API } from "@/lib/API";
import { APISuccessResponse, MovieData } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";

type StoreHistoryPayload = {
  movieId: string;
  query: string;
};
export default function useSearchHistoryMutation() {
  const storeHistoryMutation = useMutation({
    mutationFn: (payload: StoreHistoryPayload) =>
      API.post("/user/search-history", payload),
  });

  return { storeHistoryMutation };
}
