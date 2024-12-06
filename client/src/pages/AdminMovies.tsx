import Badge from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Table from "@/components/ui/Table";
import useMoviesQuery from "@/hooks/queries/useMoviesQuery";
import { formatDate } from "@/lib/utils";
import { useRef } from "react";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";

export default function AdminMovies() {
  const navigate = useNavigate();
  const scheduleButtonRef = useRef<HTMLButtonElement | null>(null);
  const {
    movieData,
    movieQuery: { isLoading },
  } = useMoviesQuery();

  return (
    <div className="p-6 bg-primary">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-white text-3xl">Added Movies</h2>
        <div className="flex items-center gap-4">
          <Button variant={"primary"} to="/movie-form">
            + Add Movies
          </Button>
        </div>
      </div>
      <Table.Root cols="minmax(24rem,2fr) minmax(6rem,0.5fr) minmax(24rem,1fr) minmax(16rem,1fr) minmax(8rem,0.5fr) minmax(10rem,1fr)">
        <Table.Head>
          <li>Poster</li>
          <li>Duration</li>
          <li>Genre</li>
          <li>Release Date</li>
          <li>Rating</li>
          <li></li>
        </Table.Head>

        {isLoading &&
          new Array(10).fill("x").map((_, i) => {
            return (
              <Table.Body key={i}>
                <div className="flex items-center w-full gap-8">
                  <Skeleton className="h-20 aspect-square" />
                  <div className="flex-1 flex flex-col gap-1">
                    <Skeleton containerClassName="flex-1" />
                    <Skeleton containerClassName="flex-1" />
                  </div>
                </div>
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </Table.Body>
            );
          })}

        {movieData?.map((movie) => {
          return (
            <Table.Body
              key={movie.MovieId}
              className="hover:bg-secondary/50 cursor-pointer transition"
              onClick={(e) => {
                if ((e.target as HTMLElement).closest(".add-schedule-button"))
                  return;
                navigate(`/movie-form/${movie.MovieId}`);
              }}
            >
              <li className="flex items-center gap-8 ">
                <img
                  src={movie.Poster}
                  className="bg-border object-cover h-20 aspect-square rounded-md"
                ></img>
                <div className="overflow-hidden">
                  <h2 className="text-white truncate">{movie.Title}</h2>
                  <p className="text-light truncate">{movie.Tagline}</p>
                </div>
              </li>
              <li className="text-light">{movie.DurationMinutes}</li>
              <li className="flex gap-2">
                <Badge variant={"default"} className="whitespace-nowrap">
                  {movie.genres[0].genre.Name}
                </Badge>
                {movie.genres.length > 1 && (
                  <Badge variant={"default"} className="whitespace-nowrap">
                    {movie.genres.length - 1} More...
                  </Badge>
                )}
              </li>
              <li className="text-light">
                {formatDate(new Date(movie.ReleaseDate))}
              </li>
              <li className="text-light">{movie.VoteAverage || "-"}</li>
              <Button
                ref={scheduleButtonRef}
                variant={"tertiary"}
                className="max-w-[12rem] add-schedule-button"
                to={`/schedule-form/${movie.MovieId}`}
              >
                + Add Schedule
              </Button>
            </Table.Body>
          );
        })}
      </Table.Root>
    </div>
  );
}
