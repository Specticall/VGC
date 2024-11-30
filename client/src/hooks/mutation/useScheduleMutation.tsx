import { API } from "@/lib/API";
import { QUERY_KEYS } from "@/lib/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type CreateSchedulePayload = {
  roomId: string;
  startDate: Date;
  time: string[];
};

export default function useScheduleMutation() {
  const queryClient = useQueryClient();
  const createScheduleMutation = useMutation({
    mutationFn: ({
      data,
      movieId,
    }: {
      data: CreateSchedulePayload;
      movieId: string;
    }) => API.post(`/schedules/${movieId}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MOVIE_SCHEDULE] });
    },
  });

  return { createScheduleMutation };
}
