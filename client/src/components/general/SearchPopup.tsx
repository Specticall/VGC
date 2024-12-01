import useMovieSearchQuery from "@/hooks/queries/useMovieSearchQuery";
import { cn, formatDate } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import useSearchHistoryMutation from "@/hooks/mutation/useSearchHistoryMutation";
import useSearchHistoryQuery from "@/hooks/queries/useSearchHistoryQuery";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/queryKeys";

export default function SearchPopup() {
  const queryClient = useQueryClient();
  const { storeHistoryMutation } = useSearchHistoryMutation();
  const { searchHistoryData } = useSearchHistoryQuery();
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { movieSearchData, movieSearchQuery } = useMovieSearchQuery({ query });
  const searchRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current?.contains(e.target as HTMLElement)) {
        return;
      }
      setIsFocused(false);
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative max-w-[30rem]" ref={searchRef}>
      <div className="w-full">
        <div className="flex items-center border [&:has(.searchbar-top:focus)]:border-accent border-border rounded-md bg-primary relative justify-between px-4 py-2">
          <div className="flex items-center gap-3">
            <i className="bx bx-search text-2xl"></i>
            <input
              onFocus={() => {
                setIsFocused(true);
              }}
              onChange={(e) => {
                if (e.target.value === "") {
                  queryClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.SEARCH_HISTORY],
                  });
                }
                setQuery(e.target.value);
              }}
              value={query}
              type="text"
              placeholder="Search Movies"
              className="bg-transparent w-full text-light focus:outline-none searchbar-top"
            />
          </div>
          <p className="text-sm text-white border-border border-2 px-3 py-2 rounded bg-secondary">
            CTRL + K
          </p>
        </div>
      </div>
      <div
        className={cn(
          "absolute top-[4.25rem] opacity-0 invisible transition-all duration-300 scale-95 bg-primary border border-border rounded-md left-0 right-0 z-50",
          isFocused && "scale-100 opacity-100 visible"
        )}
      >
        <div className="max-h-[25rem] overflow-y-auto">
          {((movieSearchData && movieSearchData.searchHistory.length > 0) ||
            (searchHistoryData &&
              searchHistoryData?.length > 0 &&
              query === "")) && (
            <>
              <p className="px-6 pt-4 pb-4">Recent Search</p>
              <ul className="grid gap-2 p-2 pt-0">
                {(movieSearchData?.searchHistory || searchHistoryData)?.map(
                  (search) => {
                    return (
                      <li
                        className="flex items-center gap-4 hover:bg-secondary rounded-md transition cursor-pointer px-4 py-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          setQuery(search.Query);
                        }}
                      >
                        <i className="bx bx-history text-2xl"></i>
                        <p>{search.Query}</p>
                      </li>
                    );
                  }
                )}
              </ul>
            </>
          )}

          <p className="px-6 pt-4 pb-4">Search Result</p>
          <ul className="grid gap-2 p-2 pt-0">
            {query === "" && (
              <div className="px-4 flex flex-col items-center justify-center py-16 rounded-md border-dashed mx-4">
                <div>
                  <i className="bx bx-search text-3xl bg-primary border border-border rounded-md w-14 mb-4 flex items-center justify-center aspect-square"></i>
                </div>
                <h2 className="text-white text-xl">Search Movies</h2>
                <p className="mt-1">Discover exiciting movies to watch</p>
              </div>
            )}
            {movieSearchQuery.isPending && query !== "" && (
              <div className="px-4 pb-1 grid gap-2">
                {new Array(5).fill("x").map((_, i) => {
                  return <Skeleton key={i} height={"3rem"} />;
                })}
              </div>
            )}
            {movieSearchData?.movies?.map((movie) => {
              return (
                <li
                  className=" flex items-center gap-4 hover:bg-secondary rounded-md transition cursor-pointer px-4 py-2"
                  key={movie.MovieId}
                  onClick={() => {
                    navigate(`/movies/${movie.MovieId}`);
                    storeHistoryMutation.mutate({
                      movieId: movie.MovieId,
                      query,
                    });
                    queryClient.invalidateQueries({
                      queryKey: [QUERY_KEYS.SEARCH_HISTORY],
                    });
                    queryClient.invalidateQueries({
                      queryKey: [QUERY_KEYS.MOVIE_SEARCH],
                    });
                    setIsFocused(false);
                  }}
                >
                  <img
                    src={movie.Poster}
                    className="w-[3.5rem] aspect-square object-cover rounded-sm"
                  />
                  <div>
                    <h3 className="text-white">{movie.Title}</h3>
                    <div className="flex gap-2 ">
                      <p>{movie.genres[0].genre.Name}</p>
                      <p>•</p>
                      <p>{movie.DurationMinutes}m</p>
                      <p>•</p>
                      <p>{formatDate(movie.ReleaseDate)}</p>
                    </div>
                  </div>
                </li>
              );
            })}
            {movieSearchData && movieSearchData?.movies.length === 0 && (
              <div className="px-4 flex flex-col items-center justify-center py-16 rounded-md border-dashed mx-4">
                <div>
                  <i className="bx bx-x text-3xl bg-primary border border-border rounded-md w-14 mb-4 flex items-center justify-center aspect-square"></i>
                </div>
                <h2 className="text-white text-xl">No Movies Found</h2>
                <p className="mt-1 text-center">
                  There aren't any movies that match your search
                </p>
                <Button
                  variant={"secondary"}
                  className="mt-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    setQuery("");
                  }}
                >
                  Clear Search
                </Button>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
