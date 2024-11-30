import { API } from "@/lib/API";
import { useMutation } from "@tanstack/react-query";

/*

      title, tagline, durationMinutes, price,
      status, releaseDate, poster, backdrop,
      trailer, ageRestriction, genreIds, languageId, castIds,

*/

type CreateMoviePayload = {
  title: string;
  tagline: string;
  durationMinutes: number;
  price: number;
  status: "COMING_SOON" | "NOW_SHOWING" | "END_OF_SHOWING";
  releaseDate: Date;
  poster: string;
  backdrop: string;
  trailer: string;
  ageRestriction: "SU" | "R13" | "D17";
  genreIds: number[];
  languageId: string;
  castIds: string[];
};

export default function useMovieMutation() {
  const createMovieMutation = useMutation({
    mutationFn: (data: CreateMoviePayload) =>
      API.post<CreateMoviePayload>("/movies", data),
  });

  return { createMovieMutation };
}
