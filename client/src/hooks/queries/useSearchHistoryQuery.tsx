import { API } from "@/lib/API";
import { QUERY_KEYS } from "@/lib/queryKeys";
import { APISuccessResponse, SearchHistory } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function useSearchHistoryQuery() {
  const searchHistoryQuery = useQuery({
    queryFn: () =>
      API.get<APISuccessResponse<SearchHistory[]>>("/user/search-history"),
    queryKey: [QUERY_KEYS.SEARCH_HISTORY],
  });

  const searchHistoryData = searchHistoryQuery.data?.data.data;

  return { searchHistoryData, searchHistoryQuery };
}
