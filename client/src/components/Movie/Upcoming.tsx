import upcoming from "../../public/upcoming.png";
import Badge from "../ui/Badge";
type Props = {
  image: string;
  badge: string[];
  title: string;
  rating: string;
};

export default function Upcoming({ image, badge, title, rating }: Props) {
  return (
    <div className="relative w-[250px] flex flex-col">
      <img src={image} alt="" className="w-full h-[320px]" />
      <div className="absolute bottom-0">
        <div className="flex flex-wrap w-full gap-1 px-1 pb-2">
          {badge.map((item, index) => (
            <Badge
              key={index}
              variant="default"
              className="text-[12px] px-5 py-1 text-white border-white"
            >
              {item}
            </Badge>
          ))}
        </div>
        <div className="px-2">
          <h1 className="text-light text-heading w-full">{title}</h1>
          <div className="flex flex-row text-white items-center pb-5 gap-2">
            <i className="bx bxs-star text-yellow-300"></i>
            <p>{rating}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
