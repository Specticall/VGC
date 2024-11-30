import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/Button";
import Dropdown from "../ui/Dropdown";
import Input from "../ui/Input";
import TimeInputs from "./TimeInputs";

type Props = {
  movieId?: string;
};

type ScheduleFields = {
  time: string[];
};

export default function CreateSchedule({ movieId }: Props) {
  const { register, control, handleSubmit } = useForm<ScheduleFields>();

  const onSubmit: SubmitHandler<ScheduleFields> = (value) => {
    console.log(value);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-primary border mt-8 border-border rounded-md"
    >
      <p className="text-white pb-4 border-b border-border px-6 py-4 text-lg">
        Create Schedule
      </p>
      <div className="grid grid-cols-4 gap-4 p-6 min-w-[60rem]">
        <div>
          <p className="text-white mb-2">Cinema</p>
          <Dropdown
            data={["CINEMA 1", "CINEMA 2", "CINEMA 3"]}
            placeholder="Select Cinema"
          />
        </div>
        <div>
          <p className="text-white mb-2">Room</p>
          <Dropdown
            data={["ROOM 1", "ROOM 2", "ROOM 3"]}
            placeholder="Select Room"
          />
        </div>
        <Input label="Ticket Price" placeholder="50.000" />
        <Input type="date" label="Date" placeholder="Select Date" />
      </div>
      <Controller
        control={control}
        name="time"
        render={({ field: { onChange, value } }) => {
          return <TimeInputs onInputTime={onChange} value={value} />;
        }}
      />
      <div className="p-6 pt-0 mt-2">
        <Button className="px-12">Air Movie</Button>
      </div>
    </form>
  );
}
