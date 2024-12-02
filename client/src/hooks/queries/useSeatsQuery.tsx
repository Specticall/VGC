import { API } from "@/lib/API";
import { QUERY_KEYS } from "@/lib/queryKeys";
import { APISuccessResponse, SeatsData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

type Props = {
  roomId?: string;
};

export default function useSeatsQuery({ roomId }: Props) {
  const seatsQuery = useQuery({
    queryFn: () =>
      API.get<
        APISuccessResponse<{ seats: SeatsData[]; reservedSeats: SeatsData[] }>
      >(`/seats/room/${roomId}`),
    queryKey: [QUERY_KEYS.SEATS],
    enabled: Boolean(roomId),
  });

  const seatsData = seatsQuery.data?.data.data;

  return { seatsData, seatsQuery };
}
