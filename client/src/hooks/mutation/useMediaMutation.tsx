import { API } from "@/lib/API";
import { useMutation } from "@tanstack/react-query";

export default function useMediaMutation() {
  const presignedURLMutation = useMutation({
    mutationFn: () => API.post("/presigned"),
    onSuccess: (response) => {
      console.log(response);
    },
  });
}
