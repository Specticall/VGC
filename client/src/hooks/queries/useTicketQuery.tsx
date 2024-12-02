import { API } from "@/lib/API";
import { QUERY_KEYS } from "@/lib/queryKeys";
import { APISuccessResponse, TicketData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function useTicketsQuery() {
  const ticketsQuery = useQuery({
    queryFn: () => API.get<APISuccessResponse<TicketData[]>>("/tickets"),
    queryKey: [QUERY_KEYS.TICKETS],
  });

  const ticketsData = ticketsQuery.data?.data.data;

  return { ticketsData, ticketsQuery };
}
