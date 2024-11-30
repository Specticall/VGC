import BackNavigation from "@/components/general/BackNavigation";
import { SubmitHandler, useForm } from "react-hook-form";
import MovieMediaInputs from "@/components/Movie/MovieMediaInputs";
import MovieGeneralInputs from "@/components/Movie/MovieGeneralInputs";
import { useParams } from "react-router-dom";
import useMovieQuery from "@/hooks/queries/useMovieQuery";
import useLanguageQuery from "@/hooks/queries/useLanguageQuery";
import useGenreQuery from "@/hooks/queries/useGenreQuery";
import useMovieMutation from "@/hooks/mutation/useMovieMutation";
import { useToast } from "@/components/ui/Toast";
import { AxiosError } from "axios";

export type MovieFields = {
  title: string;
  description: string;
  duration: number;
  language: string;
  releaseDate: string;
  cast: string[];
  fileVideo?: string;
  fileImage?: string;
  genres: string[];
};

export default function MovieForm() {
  const { id } = useParams();
  const { movieData } = useMovieQuery({ id });
  const { languageData } = useLanguageQuery();
  const { genreData } = useGenreQuery();
  const { createMovieMutation } = useMovieMutation();

  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<MovieFields>({
    values: {
      title: movieData?.Title || "",
      description: movieData?.Tagline || "",
      releaseDate: movieData?.ReleaseDate || "",
      duration: movieData?.DurationMinutes || 0,
      cast: movieData?.casts?.map((cast) => cast.CastId) || [],
      fileImage: movieData?.Poster,
      language: movieData?.language?.Name || "",
      genres: movieData?.genres?.map((genre) => genre.genre.Name) || [],
      fileVideo: undefined,
    },
  });
  const { toast } = useToast();

  const onSubmit: SubmitHandler<MovieFields> = async (value) => {
    try {
      const languageId =
        languageData?.find((lang) => lang.Name === value.language)
          ?.LanguageId || "";

      const genreIds = value.genres
        .map((data) => {
          return genreData?.find((genre) => genre.Name === data)?.GenreId;
        })
        .filter((genre) => typeof genre !== "undefined");

      const payload = {
        ageRestriction: "R13",
        backdrop: "",
        castIds: value.cast,
        durationMinutes: Number(value.duration),
        genreIds,
        languageId,
        poster: value.fileImage || "",
        price: 1000,
        releaseDate: new Date(value.releaseDate),
        status: "COMING_SOON",
        tagline: value.description,
        title: value.title,
        trailer: value.fileVideo || "",
      } as const;

      console.log(payload);
      await createMovieMutation.mutateAsync(payload);

      toast.success("Successfuly created movie");
    } catch (err) {
      console.log((err as AxiosError).response?.data);
      toast.error("Oops, Something went wrong!");
    }
  };

  return (
    <main className="min-h-screen grid p-6 ">
      <div className="flex flex-col gap-6 pt-4">
        <BackNavigation
          subtitle="Back to movie list"
          title="Add New Movie"
          to="/admin-movies"
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-[minmax(20rem,1fr)_1fr] text-white gap-5"
        >
          <MovieMediaInputs
            control={control}
            clearErrors={clearErrors}
            errors={errors}
          />
          <MovieGeneralInputs
            isSubmitting={createMovieMutation.isPending}
            control={control}
            errors={errors}
            onSubmit={onSubmit}
          />
        </form>
      </div>
    </main>
  );
}
