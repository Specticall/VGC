import { API } from "@/lib/API";
import { QUERY_KEYS } from "@/lib/queryKeys";
import { APISuccessResponse, MovieData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function useShowingMovieQuery() {
  const showingMovieQuery = useQuery({
    queryFn: () =>
      API.get<APISuccessResponse<MovieData[]>>("/movies?showing=true"),
    queryKey: [QUERY_KEYS.SHOWING_MOVIE],
  });

  const showingMovieData = showingMovieQuery.data?.data.data;

  return { showingMovieData, showingMovieQuery };
}
