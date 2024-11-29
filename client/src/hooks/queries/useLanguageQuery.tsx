import { API } from "@/lib/API";
import { QUERY_KEYS } from "@/lib/queryKeys";
import { APISuccessResponse, Language } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function useLanguageQuery() {
  const languageQuery = useQuery({
    queryFn: () => API.get<APISuccessResponse<Language[]>>("/languages"),
    queryKey: [QUERY_KEYS.LANGUAGES],
  });

  const languageData = languageQuery.data?.data.data;

  return { languageData, languageQuery };
}
