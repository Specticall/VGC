import { API } from "@/lib/API";
import { APISuccessResponse } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";

type PresignedPayload = {
  path: string;
  category: "poster" | "backdrop" | "trailer";
  mimetype: string;
};

type PresignedResponse = {
  url: string;
  fileKey: string;
};

export default function useMediaMutation() {
  const presignedURLMutation = useMutation({
    mutationFn: (payload: PresignedPayload) =>
      API.post<APISuccessResponse<PresignedResponse>>("/presigned", payload),
  });

  return { presignedURLMutation };
}
