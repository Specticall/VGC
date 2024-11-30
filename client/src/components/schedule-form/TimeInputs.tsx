import { ChangeEvent, useState } from "react";
import Input from "../ui/Input";

type Props = {
  onInputTime: (time: string[]) => void;
  value: string[];
};

export default function TimeInputs({ onInputTime, value }: Props) {
  const [current, setCurrent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddTime = () => {
    setErrorMessage("");
    if (!current) return;
    if (value && value.includes(current)) {
      setErrorMessage("Duplicate time not allowed");
      return;
    }
    onInputTime(value ? [...value, current] : [current]);
    setCurrent("");
  };

  return (
    <div className="p-6 pt-0">
      <p className="text-white whitespace-pre">
        Time <span className="text-gray"> (Duration: 90 Minutes)</span>
      </p>
      <div className="flex flex-wrap items-center mt-4 gap-4">
        {value?.map((time, i) => {
          return (
            <div
              onClick={() => {
                setErrorMessage("");
                onInputTime(value.filter((item) => item !== time));
              }}
              key={i}
              className="py-2.5 px-6 pr-5 border border-border rounded-md text-white flex gap-2 items-center justify-between"
            >
              <p>{time}</p>
              <i className="text-xl bx bx-x hover:text-accent transition cursor-pointer"></i>
            </div>
          );
        })}
        <div className="relative">
          <div className="flex items-center">
            <Input
              type="time"
              placeholder=""
              className="[&_input]:py-3 [&_input]:rounded-r-none"
              onChange={(e) => {
                const event = e as ChangeEvent<HTMLInputElement>;
                setCurrent(event.target.value);
              }}
              value={current}
            />
            <div
              className="py-3 px-4 rounded-r-md text-white bg-border hover:bg-border/75 transition cursor-pointer"
              onClick={handleAddTime}
            >
              <i className="bx bx-plus text-lg"></i>
            </div>
          </div>
          {errorMessage && (
            <div className="mt-2 text-red-500 absolute -bottom-12 whitespace-nowrap">
              <i className="bx bx-error text-red-500 pb-5 mr-2"></i>
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
