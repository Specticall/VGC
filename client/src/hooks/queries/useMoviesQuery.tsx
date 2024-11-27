import { API } from "@/lib/API";
import { QUERY_KEYS } from "@/lib/queryKeys";
import { APISuccessResponse, MovieData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function useMoviesQuery() {
  const movieQuery = useQuery({
    queryFn: () => API.get<APISuccessResponse<MovieData[]>>("/movies"),
    queryKey: [QUERY_KEYS.MOVIES],
  });

  const movieData = movieQuery.data?.data.data;

  return { movieData, movieQuery };
}
