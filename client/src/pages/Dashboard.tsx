import AiringMoviesList from "../components/dashboard/AiringMoviesList";
import Statistics from "../components/dashboard/Statistics";

export default function Dashboard() {
  return (
    <div className="w-full text-white">
      <Statistics />
      <AiringMoviesList />
    </div>
  );
}
