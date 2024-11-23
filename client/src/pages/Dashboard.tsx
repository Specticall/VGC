import AiringMoviesList from "../components/dashboard/AiringMoviesList";
import Statistics from "../components/dashboard/Statistics";

export default function Dashboard() {
  return (
    <div className="text-white flex-1">
      <div className="w-full">
        <Statistics />
        <AiringMoviesList />
      </div>
    </div>
  );
}
