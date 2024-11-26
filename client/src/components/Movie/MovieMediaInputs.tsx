import {
  Control,
  Controller,
  FieldErrors,
  UseFormClearErrors,
} from "react-hook-form";
import { MovieFields } from "../../pages/MovieForm";
import { MediaInput } from "./MediaInput";

type Props = {
  control: Control<MovieFields>;
  clearErrors: UseFormClearErrors<MovieFields>;
  errors: FieldErrors<MovieFields>;
};

export default function MovieMediaInputs({
  control,
  clearErrors,
  errors,
}: Props) {
  const { setError } = control;

  return (
    <div className="flex flex-col border-border border-2 rounded-md bg-primary h-fit ">
      <div className="flex flex-row items-center border-b border-border p-3 px-6">
        <p className="text-heading ">Media</p>
        <div className="w-2 h-2 bg-accent rounded-full ml-2 "></div>
      </div>
      <div className="w-full p-6 grid gap-6">
        <Controller
          control={control}
          name="fileImage"
          render={({ field: { onChange } }) => {
            return (
              <MediaInput
                title="Upload Poster"
                description="File must be .png or .jpg and not exceed 2mb"
                uploadDescription="Select From Device"
                errorMessage={errors.fileImage?.message}
                type="image"
                onChange={(file) => {
                  clearErrors("fileImage");
                  onChange(file);
                }}
                onError={(errorMessage) => {
                  setError("fileImage", { message: errorMessage });
                }}
              />
            );
          }}
        />
        <Controller
          control={control}
          name="fileVideo"
          render={({ field: { onChange } }) => {
            return (
              <MediaInput
                title="Upload Trailer Video"
                description="File must be .mp4 and not exceed 20mb"
                uploadDescription="Select From Device"
                type="video"
                errorMessage={errors.fileVideo?.message}
                onChange={(file) => {
                  clearErrors("fileVideo");
                  onChange(file);
                }}
                onError={(errorMessage) => {
                  setError("fileVideo", { message: errorMessage });
                }}
              />
            );
          }}
        />
      </div>
    </div>
  );
}
