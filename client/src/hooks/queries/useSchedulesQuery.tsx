import { API } from "@/lib/API";
import { QUERY_KEYS } from "@/lib/queryKeys";
import { APISuccessResponse, ScheduleData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function useSchedulesQuery() {
  const schedulesQuery = useQuery({
    queryFn: () => API.get<APISuccessResponse<ScheduleData[]>>("/schedules"),
    queryKey: [QUERY_KEYS.SCHEDULES],
  });

  const scheduleData = schedulesQuery.data?.data.data;

  return { scheduleData, schedulesQuery };
}
