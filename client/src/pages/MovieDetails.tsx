import { useNavigate, useParams } from "react-router-dom";
import MovieSlider from "@/components/ui/MovieSlider";
import useMovieQuery from "@/hooks/queries/useMovieQuery";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import useShowingMovieQuery from "@/hooks/queries/useShowingMovieQuery";
import Skeleton from "react-loading-skeleton";

export default function MovieDetails() {
  const { id } = useParams();
  const { showingMovieData } = useShowingMovieQuery();
  const { movieData } = useMovieQuery({ id });

  const navigate = useNavigate();

  console.log(movieData);

  return (
    <main className="min-h-screen">
      <div className="relative h-[40rem]">
        <div className="absolute bg-background/90 inset-0 z-20"></div>
        <img
          src={movieData?.Poster}
          className="absolute z-10 inset-0 w-full h-full object-cover"
        />
        <div className="absolute p-12  inset-0 w-full z-30">
          <div className="flex items-center justify-start gap-12 h-full">
            {movieData?.Poster ? (
              <img
                src={movieData?.Poster}
                alt=""
                className="w-full max-w-[27.5rem] h-full pl-10 object-cover rounded-md"
              />
            ) : (
              <Skeleton width={"25rem"} height={"34rem"} className="ml-10" />
            )}
            <div className="flex flex-col items-start gap-1">
              {movieData ? (
                <div className="flex flex-row items-center text-white gap-2">
                  <h1 className="text-largest font-normal">
                    {movieData?.Title}
                  </h1>
                  <i className="bx bxs-star text-orange "></i>
                  <p className="text-paragraph font-light">
                    {movieData?.VoteAverage}
                  </p>
                </div>
              ) : (
                <Skeleton height={"3rem"} width={"10rem"} />
              )}
              {movieData ? (
                <p className="text-white opacity-50 text-paragraph leading-[175%] mt-2 mb-4">
                  {movieData?.Tagline}
                </p>
              ) : (
                <Skeleton
                  height={"1rem"}
                  width={"12rem"}
                  className="mt-2 mb-4"
                />
              )}
              <div className="flex flex-row text-white items-center justify-center gap-3">
                <i className="bx bx-time-five text-2xl"></i>
                {movieData ? (
                  <p className="font-light text-paragraph">
                    {movieData?.DurationMinutes}m
                  </p>
                ) : (
                  <Skeleton height={"1rem"} width={"4rem"} />
                )}
                <i className="bx bxs-calendar text-2xl pl-3"></i>
                <p className="font-light text-paragraph">
                  {formatDate(movieData?.ReleaseDate) || (
                    <Skeleton height={"1rem"} width={"4rem"} />
                  )}
                </p>
              </div>
              <div className="mt-4 flex flex-col text-white">
                <p className="">Actors</p>
                <ul className="flex gap-6 w-full mt-6">
                  {!movieData &&
                    new Array(4).fill("x").map((_, i) => {
                      return (
                        <div key={i}>
                          <Skeleton
                            borderRadius={"100%"}
                            width={"3rem"}
                            height={"3rem"}
                          />
                          <Skeleton className="mt-4" />
                        </div>
                      );
                    })}
                  {movieData?.casts?.slice(0, 3).map((cast) => {
                    return (
                      <li
                        key={cast.CastId}
                        className="flex flex-col items-center   w-full overflow-hidden"
                      >
                        {cast.cast.Image ? (
                          <img
                            src={cast.cast?.Image || ""}
                            className="w-14 aspect-square rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-14 aspect-square bg-primary rounded-full border border-border"></div>
                        )}
                        <p className="text-center mt-3">
                          {cast.cast.Name?.split(" ")[0]}
                        </p>
                      </li>
                    );
                  })}
                  {(movieData?.casts.length || 0) > 3 && (
                    <li className="flex flex-col items-center   w-full ">
                      <div className="w-14 aspect-square bg-primary rounded-full border border-border flex items-center justify-center text-gray">
                        ...
                      </div>

                      <p className="text-center mt-3 whitespace-nowrap">
                        {(movieData?.casts?.length || 0) - 3} More...
                      </p>
                    </li>
                  )}
                </ul>
              </div>
              <Button
                variant={"secondary"}
                className="text-black px-8 py-1 rounded flex items-center gap-2 mt-8"
                onClick={() => navigate(`/order-ticket/${movieData?.MovieId}`)}
                disabled={!movieData}
              >
                <i className="bx bxs-discount text-3xl"></i>
                Get tickets
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="px-8">
        <MovieSlider data={showingMovieData} />
      </div>
    </main>
  );
}
