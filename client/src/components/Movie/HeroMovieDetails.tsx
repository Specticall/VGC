import { Button } from "../ui/Button";

type Props = {
  image: string;
  altImage: string;
  title: string;
  description: string;
  badge: string[];
  imageDetails: string;
  rating: string;
  duration: string;
  date: string;
};

export default function HeroMovieDetails({
  image,
  title,
  altImage,
  imageDetails,
  rating,
  duration,
  date,
}: Props) {
  return (
    <div className="relative h-[600px] w-full">
      <img
        src={image}
        alt={altImage}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute bottom-20 w-full">
        <div className="flex items-start justify-start gap-12">
          <img
            src={imageDetails}
            alt=""
            className="max-w-[350px] max-h-[440px] pl-10"
          />
          <div className="flex flex-col items-start gap-1">
            <div className="flex flex-row items-center text-white gap-2">
              <h1 className="text-largest font-normal">{title}</h1>
              <i className="bx bxs-star text-yellow-300 "></i>
              <p className="text-paragraph font-light">{rating}</p>
            </div>
            <p className="text-white opacity-50 text-paragraph leading-[175%] max-w-[80%] mt-2 mb-4">
              Eddie and Venom are on the run. Hunted by both of their worlds and
              with the net closing in, the duo are forced into a devastating
              decision that will bring the curtains down on Venom and Eddie's
              last dance.
            </p>
            <div className="flex flex-row text-white items-center justify-center gap-3">
              <i className="bx bx-time-five text-2xl"></i>
              <p className="font-light text-paragraph">{duration}</p>
              <i className="bx bxs-calendar text-2xl pl-3"></i>
              <p className="font-light text-paragraph">{date}</p>
            </div>
            <div className="mt-4 flex flex-col text-white">
              <p className="">Actors</p>
              <div className="flex flex-wrap gap-5 pt-5">
                {[
                  { name: "Robert D." },
                  { name: "Davin T." },
                  { name: "Chriss Patt" },
                ].map((actor, index) => (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <div className="rounded-full bg-slate-300 w-14 h-14 flex items-center justify-center"></div>
                    <p className="text-white text-xs text-center">
                      {actor.name}
                    </p>
                  </div>
                ))}
              </div>
              <div className="pt-5">
                <Button
                  variant={"secondary"}
                  className="text-black px-8 py-1 rounded flex items-center gap-2"
                >
                  <i className="bx bxs-discount text-3xl"></i>
                  Order tickets
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
