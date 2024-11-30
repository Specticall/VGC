import {
  Control,
  Controller,
  FieldErrors,
  SubmitHandler,
} from "react-hook-form";
import { cn } from "../../lib/utils";
import Input from "../ui/Input";
import { MovieFields } from "../../pages/MovieForm";
import { Button } from "../ui/Button";
import MovieActorInput from "./MovieActorInput";
import MovieLanguageInput from "./MovieLanguageInput";
import MovieGenreInput from "./MovieGenreInput";

type Props = {
  control: Control<MovieFields>;
  errors: FieldErrors<MovieFields>;
  onSubmit: SubmitHandler<MovieFields>;
  isSubmitting: boolean;
};

export default function MovieGeneralInputs({
  errors,
  control,
  isSubmitting,
}: Props) {
  const { register } = control;

  return (
    <div className="flex flex-col border-border border-2 rounded-[8px] bg-primary relative">
      <div className="flex flex-row items-center border-b border-border py-3 px-6">
        <p className="text-heading ">General Info</p>
        <div className="w-2 h-2 bg-accent rounded-full ml-2 "></div>
      </div>
      <div className="flex flex-col gap-5 p-6">
        <Input
          label="Movie Title"
          placeholder="Venom : The last dance"
          {...register("title", {
            required: "Title field is required",
          })}
          errorMessage={errors.title?.message}
        />
        <div>
          <div className="flex justify-between">
            <label className="pb-2 text-white">Description</label>
          </div>
          <textarea
            className={cn(
              "border-[1px] border-border bg-primary text-white rounded-md w-full px-6 py-4 disabled:text-slate-500 outline-none focus:border-accent transition placeholder:text-gray resize-none h-48",
              errors.description?.message && "border-red-400 "
            )}
            placeholder="Movie description"
            {...register("description", {
              required: "Description field is required",
            })}
          ></textarea>

          {errors.description?.message && (
            <div className="mt-2 text-red-500">
              <i className="bx bx-error text-red-500 pb-5 mr-2"></i>
              {errors.description?.message}
            </div>
          )}
        </div>
        <Input
          label="Duration (Minutes)"
          placeholder="120"
          {...register("duration", {
            required: "Duration field is required",
          })}
          errorMessage={errors.duration?.message}
        />
        <Input
          label="Release Date"
          type="date"
          placeholder=""
          {...register("releaseDate", {
            required: "Release Date field is required",
          })}
        />
        <MovieLanguageInput control={control} />
        <MovieGenreInput control={control} />
        <Controller
          control={control}
          name="cast"
          render={({ field: { onChange, value } }) => {
            return (
              <MovieActorInput
                onSelect={onChange}
                value={value}
                className="mt-4"
              />
            );
          }}
        />
        <div className="flex justify-end mt-8">
          <Button
            type="submit"
            className="px-8 py-3 text-white text-sm"
            isLoading={isSubmitting}
          >
            Add Movie
          </Button>
        </div>
      </div>
    </div>
  );
}
