import { API } from "@/lib/API";
import { QUERY_KEYS } from "@/lib/queryKeys";
import { APISuccessResponse, SeatsData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

type Props = {
  movieId?: string;
};

export default function useSeatsQuery({ movieId }: Props) {
  const seatsQuery = useQuery({
    queryFn: () =>
      API.get<APISuccessResponse<SeatsData[]>>(`/seats/${movieId}`),
    queryKey: [QUERY_KEYS.SEATS],
    enabled: Boolean(movieId),
  });

  const seatsData = seatsQuery.data?.data.data;

  return { seatsData, seatsQuery };
}
