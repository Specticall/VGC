import BackNavigation from "@/components/general/BackNavigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useMovieQuery from "@/hooks/queries/useMovieQuery";
import { useToast } from "@/components/ui/Toast";
import useLanguageQuery from "@/hooks/queries/useLanguageQuery";
import useGenreQuery from "@/hooks/queries/useGenreQuery";
import useMovieMutation from "@/hooks/mutation/useMovieMutation";
import { Button } from "@/components/ui/Button";
import MovieMediaInputs from "@/components/Movie/MovieMediaInputs";
import MovieGeneralInputs from "@/components/Movie/MovieGeneralInputs";

export type MovieFields = {
  title: string;
  description: string;
  duration?: number;
  language: string;
  releaseDate: string;
  price?: number;
  cast: string[];
  fileVideo?: string;
  fileImage?: string;
  genres: string[];
};

export default function MovieForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movieData } = useMovieQuery({ id });
  const { languageData } = useLanguageQuery();
  const { genreData } = useGenreQuery();
  const { createMovieMutation, updateMovieMutation, deleteMovieMutation } =
    useMovieMutation();

  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<MovieFields>({
    values: {
      title: movieData?.Title || "",
      description: movieData?.Tagline || "",
      releaseDate: movieData?.ReleaseDate.split("T")[0] || "",
      duration: movieData?.DurationMinutes,
      cast: movieData?.casts?.map((cast) => cast.CastId) || [],
      fileImage: movieData?.Poster,
      language: movieData?.language?.Name || "",
      price: movieData?.Price ? Number(movieData?.Price) : undefined,
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
        price: value.price || 0,
        releaseDate: new Date(value.releaseDate),
        status: "COMING_SOON",
        tagline: value.description,
        title: value.title,
        trailer: value.fileVideo || "",
      } as const;

      if (id) {
        await updateMovieMutation.mutateAsync({ data: payload, id });
        toast.success("Successfuly saved changes");
      } else {
        await createMovieMutation.mutateAsync(payload);
        toast.success("Successfuly created movie");
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Oops, Something went wrong!");
    }
  };

  const isEditting = Boolean(id);
  return (
    <main className="min-h-screen grid p-6 ">
      <div className="flex flex-col gap-6 pt-4">
        <div className="flex items-center justify-between">
          <BackNavigation
            subtitle="Back to movie list"
            title={isEditting ? "Edit Movie" : "Add New Movie"}
            to="/admin-movies"
          />
          <Button
            isLoading={deleteMovieMutation.isPending}
            onClick={() => {
              if (!id) return;
              deleteMovieMutation.mutate(
                { id },
                {
                  onError: () => toast.error("Something went wrong"),
                  onSuccess: () => {
                    toast.success("Successfuly deleted movie");
                    navigate("/dashboard");
                  },
                }
              );
            }}
          >
            Delete
          </Button>
        </div>
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
            isEditting={isEditting}
            isSubmitting={
              createMovieMutation.isPending ||
              updateMovieMutation.isPending ||
              deleteMovieMutation.isPending
            }
            control={control}
            errors={errors}
            onSubmit={onSubmit}
          />
        </form>
      </div>
    </main>
  );
}
