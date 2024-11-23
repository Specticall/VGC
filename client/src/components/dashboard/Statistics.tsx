import redCard from "/statistics-red.png";
import purpleCard from "/statistics-purple.png";

export default function Statistics() {
  return (
    <ul className="grid gap-6 grid-cols-2 p-6">
      <li className="relative">
        <div
          className="p-5 flex rounded-md overflow-hidden flex-col justify-center"
          style={{
            backgroundImage: `url(${redCard})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <p className="">Total Income</p>
          <h2 className="text-2xl mt-1">Rp.195.000.000,-</h2>
        </div>
      </li>
      <li className="relative">
        <div
          className="p-5 flex rounded-md flex-col justify-center"
          style={{
            backgroundImage: `url(${purpleCard})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <p className="">Playing Movies</p>
          <h2 className="text-2xl mt-1">1.265</h2>
        </div>
      </li>
    </ul>
  );
}
