import { API } from "@/lib/API";
import { QUERY_KEYS } from "@/lib/queryKeys";
import { APISuccessResponse, MovieData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

type Props = {
  id?: string;
};

export default function useMovieQuery({ id }: Props) {
  const movieQuery = useQuery({
    queryFn: () => API.get<APISuccessResponse<MovieData>>(`/movies/${id}`),
    queryKey: [QUERY_KEYS.MOVIE, id],
    enabled: Boolean(id),
  });

  const movieData = movieQuery.data?.data.data;

  return { movieData, movieQuery };
}
