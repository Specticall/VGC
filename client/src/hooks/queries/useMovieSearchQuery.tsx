import { API } from "@/lib/API";
import { QUERY_KEYS } from "@/lib/queryKeys";
import { APISuccessResponse, MovieData, SearchHistory } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

type Props = {
  query?: string;
};

type SearchResponse = APISuccessResponse<{
  movies: MovieData[];
  searchHistory: SearchHistory[];
}>;

export default function useMovieSearchQuery({ query }: Props) {
  const movieSearchQuery = useQuery({
    queryFn: () =>
      API.get<SearchResponse>(`/movies?query=${query}&showing=true`),
    queryKey: [QUERY_KEYS.MOVIE_SEARCH, query],
    enabled: Boolean(query),
  });

  const movieSearchData = movieSearchQuery.data?.data.data;

  return { movieSearchData, movieSearchQuery };
}
