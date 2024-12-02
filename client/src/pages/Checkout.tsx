import BackNavigation from "@/components/general/BackNavigation";
import { Button } from "@/components/ui/Button";
import useMovieQuery from "@/hooks/queries/useMovieQuery";
import { formatDate, formatToRupiah } from "@/lib/utils";
import { useMemo } from "react";
import useSeatsQuery from "@/hooks/queries/useSeatsQuery";
import useOrderMutation from "@/hooks/mutation/useOrderMutation";
import { useToast } from "@/components/ui/Toast";
import { LocalCheckoutData, MidtransSuccess } from "@/lib/types";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

export default function Checkout() {
  const data = JSON.parse(
    localStorage.getItem("checkout") || "{}"
  ) as LocalCheckoutData;

  const navigate = useNavigate();
  const { createOrderMutation, confirmPaymentMutation } = useOrderMutation();
  const { movieData } = useMovieQuery({ id: data.movieId });
  const { seatsData } = useSeatsQuery({ roomId: data?.roomId });
  const { toast } = useToast();

  const handleConfirmPayment = () => {
    createOrderMutation.mutate(
      {
        scheduleId: data.scheduleId,
        seatIds: data.seatsId,
      },
      {
        onError: () => toast.error("Something went wrong!"),
        onSuccess: (response) => {
          const snapToken = response.data.data.token;
          const reservationId = response.data.data.reservationId;
          window.snap.pay(snapToken, {
            onSuccess: async (result: MidtransSuccess) => {
              try {
                await confirmPaymentMutation.mutateAsync({
                  reservationId,
                  seatIds: data.seatsId,
                });
                navigate("/movies");
                localStorage.removeItem("checkout");
              } catch (err) {
                console.log((err as AxiosError)?.response?.data);
                toast.error(
                  "Something went wrong while confirming your payment"
                );
              }
            },
            onError: () => {
              toast.error("Something went wrong!");
            },
            onClose: () => {
              console.log("Payment popup closed");
            },
          });
        },
      }
    );
  };

  const seats = useMemo(() => {
    if (!data.seatsId) return;
    return data.seatsId.map((id) => {
      const seat = seatsData?.seats.find((seat) => seat.SeatId === id);
      if (!seat) return undefined;
      return {
        id,
        code: `${seat?.Row}${seat?.Number}`,
      };
    });
  }, [seatsData, data]);

  return (
    <div className="flex justify-center items-center min-h-screen p-10">
      <div className="flex flex-col items-center w-full max-w-[40rem] text-left">
        <div className="flex self-start">
          <BackNavigation
            subtitle="Back to seat booking"
            title="Checkout Order"
            to={`/order-ticket/${movieData?.MovieId}`}
          />
        </div>
        <div className="pt-10 w-full">
          <div className="border-2 border-border rounded text-white bg-primary">
            <div className="border-b border-border p-4">
              <p className="text-heading font-medium">Order Summary</p>
            </div>
            <div className=" items-start justify-center p-10 border-b border-border grid grid-cols-[6fr_5fr]">
              <img src={movieData?.Poster} alt="" className="" />
              <div className="flex flex-col pl-5 border-l border-border">
                <h1 className="text-title">{movieData?.Title}</h1>
                <p className="text-gray text-paragraph max-w-[70%]">
                  {data.location}
                </p>
                <div className="flex items-center pt-5 gap-3 text-light">
                  <i className="bx bx-time-five text-2xl"></i>
                  <p>{formatDate(data.startTime)}</p>
                </div>
                <div className="flex items-center gap-3 pt-1 text-light">
                  <i className="bx bxs-calendar text-2xl "></i>
                  <p>19:00 - 21:00</p>
                </div>
                <div className="flex items-center pt-10 gap-4 text-light">
                  <i className="bx bxs-discount text-2xl"></i>
                  <p>{seats?.length} Seats</p>
                </div>
                <p className="font-light">
                  {seats?.map((seat) => seat?.code).join(", ")}
                </p>
              </div>
            </div>
            <div className="text-white flex justify-between w-full px-10 border-b border-border py-10">
              <div className="flex flex-col">
                <p className="text-paragraph text-gray">Grand Total</p>
                <h3 className="text-title">
                  {seats?.length && movieData?.Price
                    ? formatToRupiah(seats.length * Number(movieData?.Price))
                    : "-"}
                </h3>
                <p className="text-paragraph text-gray">Tax Included</p>
              </div>
              <div className="flex flex-col">
                <p className="text-gray">Seats</p>
                <p>
                  {seats?.length} x{" "}
                  {formatToRupiah(Number(movieData?.Price) || 0)}
                </p>
              </div>
            </div>
            <div className="flex justify-end w-full p-10  border-t border-border">
              <Button
                className="bg-accent text-white w-[200px] p-5 rounded-[8px]"
                onClick={handleConfirmPayment}
                isLoading={
                  createOrderMutation.isPending ||
                  confirmPaymentMutation.isPending
                }
              >
                Confirm Payment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
