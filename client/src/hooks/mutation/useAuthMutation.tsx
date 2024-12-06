import { API } from "@/lib/API";
import { QUERY_KEYS } from "@/lib/queryKeys";
import { APISuccessResponse, UserData } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

type GoogleLoginPayload = {
  access_token: string;
};

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  age: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

export default function useAuthMutation() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLoginSuccess = (
    response: AxiosResponse<
      APISuccessResponse<{ token: string; userData: UserData }>
    >
  ) => {
    const { token, userData } = response.data.data;
    localStorage.setItem("token", token);

    queryClient.setQueryData([QUERY_KEYS.USERS], {
      data: { data: userData },
    });
    navigate("/movies");
  };

  const googleLoginMutation = useMutation({
    mutationFn: (payload: GoogleLoginPayload) =>
      API.post<APISuccessResponse<{ token: string; userData: UserData }>>(
        "/auth/login/google",
        payload
      ),
    onSuccess: handleLoginSuccess,
  });

  const registerMutation = useMutation({
    mutationFn: (payload: RegisterPayload) =>
      API.post("/auth/register", payload),
    onSuccess: handleLoginSuccess,
  });

  const loginMutation = useMutation({
    mutationFn: (payload: LoginPayload) => API.post("/auth/login", payload),
    onSuccess: handleLoginSuccess,
  });

  return { googleLoginMutation, registerMutation, loginMutation };
}
