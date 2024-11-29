import Dropdown from "../ui/Dropdown";
import { Control, Controller } from "react-hook-form";
import { MovieFields } from "@/pages/MovieForm";
import useGenreQuery from "@/hooks/queries/useGenreQuery";

type Props = {
  control: Control<MovieFields>;
};

export default function MovieGenre({ control }: Props) {
  const { genreData } = useGenreQuery();
  const {
    _formState: { errors },
  } = control;

  return (
    <div>
      <p className="mb-2">Genres (Select Multiple)</p>
      <Controller
        control={control}
        name="genres"
        rules={{
          required: "Language field is required",
        }}
        render={({ field: { onChange, value } }) => {
          return (
            <Dropdown
              multiple
              onSelect={onChange}
              value={value}
              data={genreData?.map((lang) => lang.Name)}
              errorMessage={errors.genres?.message}
            />
          );
        }}
      />
    </div>
  );
}
