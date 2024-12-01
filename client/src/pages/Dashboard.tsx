import Statistics from "@/components/dashboard/Statistics";
import AdminMovies from "./AdminMovies";
import Topbar from "../components/general/Topbar";

export default function Dashboard() {
  return (
    <div className="w-full text-white">
      <Topbar title="Dashboard" />
      <Statistics />
      <AdminMovies />
    </div>
  );
}
