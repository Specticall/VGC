import { useNavigate } from "react-router-dom";
import Badge from "../ui/Badge";
import { Button } from "../ui/Button";
import { MovieData } from "@/lib/types";
import React from "react";
import Skeleton from "react-loading-skeleton";

type Props = {
  movie?: MovieData;
};
export default function Featured({ movie }: Props) {
  const navigate = useNavigate();

  if (!movie) {
    return <Skeleton height={"30rem"} width={"100%"} />;
  }

  return (
    <div className="relative h-[30rem] w-full rounded-lg overflow-hidden">
      <img
        src={movie?.Poster}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 p-12 bg-gradient-to-t from-black to-transparent inset-0 w-full rounded-b-lg flex flex-col justify-end">
        <div className="flex items-start gap-2">
          {/* KIRI */}
          <div className="flex-1">
            <div className="flex gap-2 mb-2">
              <h1 className="inline text-white text-largest whitespace-pre mr-3 font-medium">
                {movie?.Title}
                {"   "}
                {movie?.genres.map((item, index) => (
                  <React.Fragment key={index}>
                    <Badge
                      variant={"default"}
                      className="text-sm text-center align-middle  inline text-paragraph px-5 py-1 text-white"
                    >
                      {item.genre.Name}
                    </Badge>{" "}
                  </React.Fragment>
                ))}
              </h1>
            </div>
            <p className="text-white text-opacity-50 max-w-[67%] leading-[175%] mt-3">
              {movie?.Tagline}
            </p>{" "}
          </div>
          {/* KANAN */}
          <Button
            variant={"secondary"}
            className="text-black px-8 py-1 rounded flex items-center gap-2 self-end"
            onClick={() => {
              navigate(`/order-ticket/${movie?.MovieId}`);
            }}
          >
            <i className="bx bxs-discount text-3xl"></i>
            Get tickets
          </Button>
        </div>
      </div>
      {/* <div className="absolute bottom-4 right-4">
        <Button
          variant={"secondary"}
          className="text-black px-8 py-1 rounded flex items-center gap-2"
        >
          <i className="bx bxs-discount text-3xl"></i>
          Get tickets
        </Button>
      </div> */}
    </div>
  );
}
