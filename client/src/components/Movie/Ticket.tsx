type Props = {
  image: string;
  title: string;
  place: string;
  date: string;
  time: string;
  seats: number;
  seatsNumber: string[];
};

export default function Ticket({
  image,
  title,
  place,
  date,
  time,
  seats,
  seatsNumber,
}: Props) {
  return (
    <div>
      <div className="border border-border rounded p-4">
        <div className="flex w-full gap-5">
          <div className="flex items-start justify-start">
            <img src={image} alt="" className="w-full h-auto" />
          </div>
          <div className="flex flex-col border-border">
            <h1 className="text-title">{title}</h1>
            <p className="text-gray text-paragraph max-w-[80%]">{place}</p>
            <div className="flex items-center pt-5 gap-3 text-light">
              <i className="bx bx-time-five text-2xl"></i>
              <p>{date}</p>
            </div>
            <div className="flex items-center gap-3 pt-1 text-light">
              <i className="bx bxs-calendar text-2xl "></i>
              <p>{time}</p>
            </div>
            <div className="flex items-center pt-5 gap-4 text-light">
              <i className="bx bxs-discount text-2xl"></i>
              <p>{seats} Seats</p>
            </div>
            <p className="font-light">
              {seatsNumber.map((seats) => seats).join(", ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
