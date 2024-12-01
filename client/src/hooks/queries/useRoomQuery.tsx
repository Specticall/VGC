import { API } from "@/lib/API";
import { QUERY_KEYS } from "@/lib/queryKeys";
import { APISuccessResponse, RoomData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function useRoomsQuery({ cinemaId }: { cinemaId: string }) {
  const roomsQuery = useQuery({
    queryFn: () =>
      API.get<APISuccessResponse<RoomData[]>>(`/rooms/${cinemaId}`),
    queryKey: [QUERY_KEYS.ROOM, cinemaId],
    enabled: Boolean(cinemaId),
  });

  const roomData = roomsQuery.data?.data.data;

  return { roomData, roomsQuery };
}
