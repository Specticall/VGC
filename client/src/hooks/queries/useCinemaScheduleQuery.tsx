import { API } from "@/lib/API";
import { QUERY_KEYS } from "@/lib/queryKeys";
import { APISuccessResponse, CinemaScheduleData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

type Props = {
  movieId?: string;
};

export default function useCinemaScheduleQuery({ movieId }: Props) {
  const cinemaScheduleQuery = useQuery({
    queryFn: () =>
      API.get<APISuccessResponse<CinemaScheduleData[]>>(`/seats/${movieId}`),
    queryKey: [QUERY_KEYS.CINEMA_SCHEDULE],
    enabled: Boolean(movieId),
  });

  const cinemaScheduleData = cinemaScheduleQuery.data?.data.data;

  return { cinemaScheduleData, cinemaScheduleQuery };
}
