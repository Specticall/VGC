import Badge from "../ui/Badge";
import { Button } from "../ui/Button";

type Props = {
  image: string;
  altImage: string;
  title: string;
  description: string;
  badge: string[];
};
export default function Featured({
  image,
  title,
  description,
  badge,
  altImage,
}: Props) {
  return (
    <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
      <img
        src={image}
        alt={altImage}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black to-transparent w-full rounded-b-lg">
        <div className="flex flex-col items-start gap-2">
          <div className="flex flex-row items-center gap-2">
            <h1 className="text-white text-largest font-medium">{title}</h1>
            {badge.map((item, index) => (
              <Badge
                key={index}
                variant={"default"}
                className="text-paragraph px-5 py-1 text-white"
              >
                {item}
              </Badge>
            ))}
          </div>
          <p className="text-white text-opacity-50 max-w-[67%] leading-[175%]">
            {description}
          </p>
        </div>
      </div>
      <div className="absolute bottom-4 right-4">
        <Button
          variant={"secondary"}
          className="text-black px-8 py-1 rounded flex items-center gap-2"
        >
          <i className="bx bxs-discount text-3xl"></i>
          Get tickets
        </Button>
      </div>
    </div>
  );
}
