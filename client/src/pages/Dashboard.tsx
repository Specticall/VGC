import Statistics from "@/components/dashboard/Statistics";
import AdminMovies from "./AdminMovies";

export default function Dashboard() {
  return (
    <div className="w-full text-white">
      <Statistics />
      <AdminMovies />
    </div>
  );
}
