import { API } from "@/lib/API";
import { QUERY_KEYS } from "@/lib/queryKeys";
import { APISuccessResponse, ScheduleData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

type Props = {
  id?: string;
};

export default function useMovieScheduleQuery({ id }: Props) {
  const movieScheduleQuery = useQuery({
    queryFn: () =>
      API.get<APISuccessResponse<ScheduleData[]>>(`/schedules?movieId=${id}`),
    queryKey: [QUERY_KEYS.MOVIE_SCHEDULE],
    enabled: Boolean(id),
  });

  const movieScheduleData = movieScheduleQuery.data?.data.data;

  return { movieScheduleData, movieScheduleQuery };
}
