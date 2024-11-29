import { API } from "@/lib/API";
import { QUERY_KEYS } from "@/lib/queryKeys";
import { ActorData, APISuccessResponse } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function useActorsQuery() {
  const actorsQuery = useQuery({
    queryFn: () => API.get<APISuccessResponse<ActorData[]>>("/casts"),
    queryKey: [QUERY_KEYS.ACTORS],
  });

  const actorsData = actorsQuery.data?.data.data;

  return { actorsData, actorsQuery };
}
