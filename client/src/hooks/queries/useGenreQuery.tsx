import { API } from "@/lib/API";
import { QUERY_KEYS } from "@/lib/queryKeys";
import { APISuccessResponse, GenreData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function useGenreQuery() {
  const genreQuery = useQuery({
    queryFn: () => API.get<APISuccessResponse<GenreData[]>>("/genres"),
    queryKey: [QUERY_KEYS.GENRES],
  });

  const genreData = genreQuery.data?.data.data;

  return { genreData, genreQuery };
}
