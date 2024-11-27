import BackNavigation from "@/components/general/BackNavigation";
import { SubmitHandler, useForm } from "react-hook-form";
import MovieMediaInputs from "@/components/Movie/MovieMediaInputs";
import MovieGeneralInputs from "@/components/Movie/MovieGeneralInputs";
import { useParams } from "react-router-dom";
import useMovieQuery from "@/hooks/queries/useMovieQuery";

export type MovieFields = {
  title: string;
  description: string;
  duration: number;
  releaseDate: string;
  cast: string[];
  fileVideo?: string;
  fileImage?: string;
};

export default function MovieForm() {
  const { id } = useParams();
  const { movieData } = useMovieQuery({ id });

  const {
    control,
    clearErrors,
    formState: { errors },
  } = useForm<MovieFields>({
    values: {
      title: movieData?.Title || "",
      description: movieData?.Tagline || "",
      releaseDate: movieData?.ReleaseDate || "",
      duration: movieData?.DurationMinutes || 0,
      cast: [],
      fileImage: movieData?.Poster,
      fileVideo: undefined,
    },
  });

  const onSubmit: SubmitHandler<MovieFields> = (value) => {
    console.log(value);
  };

  return (
    <main className="min-h-screen grid p-6 ">
      <div className="flex flex-col gap-6 pt-4">
        <BackNavigation
          subtitle="Back to movie list"
          title="Add New Movie"
          to="/admin-movies"
        />
        <div className="grid grid-cols-[minmax(20rem,1fr)_1fr] text-white gap-5">
          <MovieMediaInputs
            control={control}
            clearErrors={clearErrors}
            errors={errors}
          />
          <MovieGeneralInputs
            control={control}
            errors={errors}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </main>
  );
}
