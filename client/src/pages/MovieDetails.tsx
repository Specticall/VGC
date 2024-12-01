import HeroMovieDetails from "../components/Movie/HeroMovieDetails";
import movieDetails from "../../public/Movie/movieDetails.png";
import details from "../../public/Movie/Details.png";
import Topbar from "../components/general/Topbar";
import Upcoming from "../components/Movie/Upcoming";
import upcomingImage from "../../public/Movie/upcoming.png";
import { Button } from "../components/ui/Button";
import { useParams } from "react-router-dom";

export default function MovieDetails() {
  const { id } = useParams();
  return (
    <main className="min-h-screen">
      <div className="h-[600px]">
        <HeroMovieDetails
          image={movieDetails}
          imageDetails={details}
          altImage="Featured"
          title="Venom : The Last Dance"
          description="Eddie and Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision that will bring the curtains down on Venom and Eddie's last dance."
          badge={["Action", "Thriller"]}
          rating="8.5/10"
          duration="1h 20m"
          date="18 November, 2024"
        />
      </div>
      <div className="flex flex-col px-7 pt-10 pb-10">
        <div className="flex justify-between">
          <h1 className="text-white text-title">Similiar Movies</h1>
          <Button
            variant={"secondary"}
            className="text-black px-8 py-1 rounded flex items-center gap-2"
          >
            <i className="bx bx-sort-alt-2 text-5sm"></i>
            Sort
          </Button>
        </div>
        <div className="grid grid-cols-4 gap-5 pt-5">
          <Upcoming
            image={upcomingImage}
            badge={["Action"]}
            title="Venom : The Last Dance"
            rating="8.8"
          />
          <Upcoming
            image={upcomingImage}
            badge={["Action"]}
            title="Venom : The Last Dance"
            rating="8.8"
          />
          <Upcoming
            image={upcomingImage}
            badge={["Action"]}
            title="Venom : The Last Dance"
            rating="8.8"
          />
          <Upcoming
            image={upcomingImage}
            badge={["Action"]}
            title="Venom : The Last Dance"
            rating="8.8"
          />
          <Upcoming
            image={upcomingImage}
            badge={["Action"]}
            title="Venom : The Last Dance"
            rating="8.8"
          />
        </div>
      </div>
    </main>
  );
}
