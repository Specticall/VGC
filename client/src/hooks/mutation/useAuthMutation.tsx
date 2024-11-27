import { API } from "@/lib/API";
import { QUERY_KEYS } from "@/lib/queryKeys";
import { APISuccessResponse, UserData } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

type GoogleLoginPayload = {
  access_token: string;
};

export default function useAuthMutation() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const googleLoginMutation = useMutation({
    mutationFn: (payload: GoogleLoginPayload) =>
      API.post<APISuccessResponse<{ token: string; userData: UserData }>>(
        "/auth/login/google",
        payload
      ),
    onSuccess: (response) => {
      const { token, userData } = response.data.data;
      localStorage.setItem("token", token);

      queryClient.setQueryData([QUERY_KEYS.USERS], {
        data: { data: userData },
      });
      navigate("/movies");
    },
  });

  return { googleLoginMutation };
}
