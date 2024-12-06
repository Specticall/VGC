import { API } from "@/lib/API";
import { QUERY_KEYS } from "@/lib/queryKeys";
import { APISuccessResponse, TicketData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

type Props = {
  reservationId?: string;
};

export default function useReservationQuery({ reservationId }: Props) {
  const reservationQuery = useQuery({
    queryFn: () =>
      API.get<APISuccessResponse<TicketData>>(`/tickets/${reservationId}`),
    queryKey: [QUERY_KEYS.TICKETS_RESERVATION, reservationId],
    enabled: Boolean(reservationId),
  });

  const reservationData = reservationQuery.data?.data.data;

  return { reservationData, reservationQuery };
}
