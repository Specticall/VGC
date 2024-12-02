import { API } from "@/lib/API";
import { APISuccessResponse } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";

type OrderPayload = {
  seatIds: string[];
  scheduleId: string;
};

type ConfirmPaymentPayload = {
  reservationId: string;
  seatIds: string[];
};

export default function useOrderMutation() {
  const createOrderMutation = useMutation({
    mutationFn: (payload: OrderPayload) =>
      API.post<APISuccessResponse<{ token: string; reservationId: string }>>(
        "/payments",
        payload
      ),
  });

  const confirmPaymentMutation = useMutation({
    mutationFn: (payload: ConfirmPaymentPayload) =>
      API.put("/payments", payload),
  });

  return { createOrderMutation, confirmPaymentMutation };
}
