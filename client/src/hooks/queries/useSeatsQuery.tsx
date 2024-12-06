import { API } from "@/lib/API";
import { QUERY_KEYS } from "@/lib/queryKeys";
import { APISuccessResponse, SeatsData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

type Props = {
  scheduleId?: string;
  roomId?: string;
};

export default function useSeatsQuery({ scheduleId, roomId }: Props) {
  const seatsQuery = useQuery({
    queryFn: () =>
      API.get<
        APISuccessResponse<{ seats: SeatsData[]; reservedSeats: SeatsData[] }>
      >(`/seats/room/${scheduleId}/${roomId}`),
    queryKey: [QUERY_KEYS.SEATS, scheduleId, roomId],
    enabled: Boolean(scheduleId) && Boolean(roomId),
  });

  const seatsData = seatsQuery.data?.data.data;

  return { seatsData, seatsQuery };
}
