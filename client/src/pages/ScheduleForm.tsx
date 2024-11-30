import CreateSchedule from "@/components/schedule-form/CreateSchedule";
import ScheduleTable from "@/components/schedule-form/ScheduleTable";
import useMovieQuery from "@/hooks/queries/useMovieQuery";
import Skeleton from "react-loading-skeleton";
import { useNavigate, useParams } from "react-router-dom";

export default function ScheduleForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movieData } = useMovieQuery({ id });

  return (
    <div className="p-6">
      <div className="flex gap-4">
        <i
          className="bx bx-arrow-back bg-primary border border-border rounded-md p-4 text-white flex items-center justify-center text-2xl w-16 transition hover:bg-secondary cursor-pointer"
          onClick={() => navigate("/dashboard", { replace: true })}
        ></i>
        <div>
          <p className="text-light">Back to movie list</p>
          <h2 className="text-white text-3xl mt-1">
            {movieData?.Title || <Skeleton />}
          </h2>
        </div>
      </div>
      <CreateSchedule movieId={id} />
      <ScheduleTable movieId={id} />
    </div>
  );
}
