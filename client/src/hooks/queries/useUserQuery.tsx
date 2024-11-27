import { API } from "@/lib/API";
import { QUERY_KEYS } from "@/lib/queryKeys";
import { APISuccessResponse, UserData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function useUserQuery() {
  const userQuery = useQuery({
    queryFn: () => API.get<APISuccessResponse<UserData>>("/user"),
    queryKey: [QUERY_KEYS.USERS],
  });

  const userData = userQuery.data?.data.data;

  return { userData, userQuery };
}
