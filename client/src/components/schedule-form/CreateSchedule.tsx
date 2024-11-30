import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/Button";
import Dropdown from "../ui/Dropdown";
import Input from "../ui/Input";
import TimeInputs from "./TimeInputs";
import useCinemaQuery from "@/hooks/queries/useCinemaQuery";
import useRoomsQuery from "@/hooks/queries/useRoomQuery";
import useScheduleMutation from "@/hooks/mutation/useScheduleMutation";
import { useToast } from "../ui/Toast";

type Props = {
  movieId?: string;
};

type ScheduleFields = {
  time: string[];
  cinemaId: string;
  roomId: string;
  startDate: Date;
};

export default function CreateSchedule({ movieId }: Props) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ScheduleFields>();
  const { cinemaData } = useCinemaQuery();
  const { createScheduleMutation } = useScheduleMutation();
  const { roomData } = useRoomsQuery({ cinemaId: watch("cinemaId") });
  const { toast } = useToast();

  const onSubmit: SubmitHandler<ScheduleFields> = (value) => {
    if (!movieId) return;
    createScheduleMutation.mutate(
      { data: value, movieId },
      {
        onSuccess: () => {
          toast.success("Successfuly added schedule");
          reset();
        },
        onError: () => toast.error("Something went wrong!"),
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-primary border mt-8 border-border rounded-md"
    >
      <p className="text-white pb-4 border-b border-border px-6 py-4 text-lg">
        Create Schedule
      </p>
      <div className="grid grid-cols-3 gap-4 p-6 min-w-[30rem]">
        <div>
          <p className="text-white mb-2">Cinema</p>
          <Controller
            control={control}
            name="cinemaId"
            rules={{ required: "Cinema can't be empty" }}
            render={({ field: { onChange, value } }) => {
              const cinemaName = cinemaData?.find(
                (data) => data.CinemaId === value
              )?.Name;

              return (
                <Dropdown
                  data={cinemaData?.map((data) => data.Name)}
                  placeholder="Select Cinema"
                  errorMessage={errors.cinemaId?.message}
                  value={cinemaName}
                  onSelect={(value) => {
                    setValue("roomId", "");
                    const cinemaId = cinemaData?.find(
                      (data) => data.Name === value
                    )?.CinemaId;
                    onChange(cinemaId);
                  }}
                />
              );
            }}
          />
        </div>
        <div>
          <p className="text-white mb-2">Room</p>
          <Controller
            control={control}
            name="roomId"
            rules={{ required: "Room can't be empty" }}
            render={({ field: { onChange, value } }) => {
              const roomName = roomData?.find(
                (data) => data.RoomId === value
              )?.Name;

              return (
                <Dropdown
                  data={roomData?.map((room) => room.Name)}
                  placeholder={roomName ? "Select Room" : "Select Cinema First"}
                  value={roomName || ""}
                  onSelect={(value) => {
                    const roomId = roomData?.find(
                      (data) => data.Name === value
                    )?.RoomId;

                    onChange(roomId);
                  }}
                  errorMessage={errors.roomId?.message}
                />
              );
            }}
          />
        </div>
        <Input
          {...register("startDate", { required: "Date can't be empty" })}
          type="date"
          label="Date"
          placeholder="Select Date"
          errorMessage={errors.startDate?.message}
        />
      </div>
      <Controller
        control={control}
        name="time"
        render={({ field: { onChange, value } }) => {
          return <TimeInputs onInputTime={onChange} value={value} />;
        }}
      />
      <div className="p-6 pt-0 mt-2">
        <Button className="px-12" isLoading={createScheduleMutation.isPending}>
          Air Movie
        </Button>
      </div>
    </form>
  );
}
