import { API } from "@/lib/API";
import { QUERY_KEYS } from "@/lib/queryKeys";
import { APIErrorResponse, APISuccessResponse, UserData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function useUserQuery() {
  const userQuery = useQuery({
    queryFn: () => API.get<APISuccessResponse<UserData>>("/user"),
    queryKey: [QUERY_KEYS.USERS],
    retry: false,
  });

  const userData = userQuery.data?.data.data;

  const errorMessage = (
    (userQuery.error as AxiosError)?.response?.data as APIErrorResponse
  )?.message;

  return { userData, userQuery, errorMessage };
}
