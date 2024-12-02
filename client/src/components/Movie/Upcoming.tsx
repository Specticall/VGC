import { useNavigate } from "react-router-dom";
import Badge from "../ui/Badge";
import { MovieData } from "@/lib/types";
type Props = {
  movieData?: MovieData;
};

export default function Upcoming({ movieData }: Props) {
  const navigate = useNavigate();

  if (!movieData) {
    return;
  }

  return (
    <div
      className="relative flex flex-col shrink-0 w-[19rem] h-full rounded-md overflow-hidden group cursor-pointer"
      onClick={() => {
        navigate(`/movies/${movieData.MovieId}`);
      }}
    >
      <div className="h-full relative">
        <div className="bg-gradient-to-t from-primary/90 to-primary/0 absolute inset-0 z-10"></div>
        <img
          src={movieData.Poster}
          alt=""
          className="group-hover:scale-105 transition-all duration-200 object-cover w-full h-full"
        />
      </div>
      <div className="absolute bottom-0 p-4 z-20">
        <div className="flex flex-wrap w-full gap-1 px-1 mb-2">
          <Badge
            variant="default"
            className="text-[12px] py-[1px] px-[12px] text-white border-white"
          >
            {movieData.genres[0].genre.Name}
          </Badge>
        </div>
        <div className="px-2">
          <h1 className="text-white mb-1 text-heading w-full">
            {movieData.Title}
          </h1>
          <div className="flex flex-row text-white items-center gap-2">
            <i className="bx bxs-star text-orange"></i>
            <p>{movieData.VoteAverage}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
