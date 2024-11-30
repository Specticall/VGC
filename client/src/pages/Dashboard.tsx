import AiringMoviesList from "../components/dashboard/AiringMoviesList";
import Statistics from "../components/dashboard/Statistics";
import Topbar from "../components/general/Topbar";

export default function Dashboard() {
  return (
    <div className="w-full text-white">
      <Topbar title="Dashboard" />
      <Statistics />
      <AiringMoviesList />
    </div>
  );
}
