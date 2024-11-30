import { API } from "@/lib/API";
import { QUERY_KEYS } from "@/lib/queryKeys";
import { APISuccessResponse, CinemaData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function useCinemaQuery() {
  const cinemaQuery = useQuery({
    queryFn: () => API.get<APISuccessResponse<CinemaData[]>>("/cinemas"),
    queryKey: [QUERY_KEYS.CINEMA],
  });

  const cinemaData = cinemaQuery.data?.data.data;

  return { cinemaData, cinemaQuery };
}
