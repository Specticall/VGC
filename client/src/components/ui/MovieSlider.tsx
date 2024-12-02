import { MovieData } from "@/lib/types";
import { Swiper, SwiperSlide } from "swiper/react";
import Upcoming from "../Movie/Upcoming";
import { useRef } from "react";
import Skeleton from "react-loading-skeleton";

type Props = {
  data?: MovieData[];
};

export default function MovieSlider({ data }: Props) {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const handleSlide = (direction: "left" | "right") => () => {
    const sliderEl = sliderRef.current;
    if (!sliderEl) return;

    if (direction === "right") {
      sliderEl.scrollBy({
        left: 280,
        behavior: "smooth",
      });
    }
    if (direction === "left") {
      sliderEl.scrollBy({
        left: -280,
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between mt-12 mb-8">
        <h1 className="text-light text-large ">Upcoming Movies</h1>
        <div className="flex gap-4 items-center">
          <i
            className="bx bx-chevron-left bg-primary border border-border text-light rounded-full text-3xl w-12 aspect-square flex items-center justify-center cursor-pointer hover:opacity-75 transition"
            onClick={handleSlide("left")}
          ></i>
          <i
            className="bx bx-chevron-right bg-primary border border-border text-light rounded-full text-3xl w-12 aspect-square flex items-center justify-center cursor-pointer hover:opacity-75 transition"
            onClick={handleSlide("right")}
          ></i>
        </div>
      </div>
      <div
        className="overflow-x-auto overflow-y-hidden  relative flex-1 h-[25rem]"
        ref={sliderRef}
      >
        <div className="absolute top-0 bottom-0">
          <div className="flex h-full gap-6">
            {!data &&
              new Array(7).fill("x").map((_, i) => {
                return (
                  <Skeleton
                    key={i}
                    width={"19rem"}
                    className="shrink-0"
                    height={"100%"}
                  />
                );
              })}
            {data?.map((movie, i) => {
              return <Upcoming key={i} movieData={movie} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
