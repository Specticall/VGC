import Featured from "../components/Movie/Featured";
import Badge from "../components/ui/Badge";
import MovieSlider from "@/components/ui/MovieSlider";
import useShowingMovieQuery from "@/hooks/queries/useShowingMovieQuery";

export default function Movies() {
  const { showingMovieData } = useShowingMovieQuery();

  return (
    <main className="min-h-screen">
      <div className="p-8">
        <div className="flex flex-col">
          <div className="flex flex-col">
            <div className="flex items-center  text-white gap-5 pb-5">
              <h1 className="text-light text-large">Featured</h1>
              <Badge
                variant={"default"}
                className="text-sm px-3 text-white bg-accent"
              >
                Trending Movies
              </Badge>
            </div>

            <Featured movie={showingMovieData?.[0]} />
          </div>
        </div>
        <MovieSlider data={showingMovieData} />
      </div>
    </main>
  );
}
