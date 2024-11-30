import Topbar from "../components/general/Topbar";
import Featured from "../components/Movie/Featured";
import Badge from "../components/ui/Badge";
import featuredImage from "../../public/Movie/featured.png";
import Upcoming from "../components/Movie/Upcoming";
import upcomingImage from "../../public/Movie/upcoming.png";

export default function Movies() {
  return (
    <main className="min-h-screen">
      <div className="px-5 pt-5">
        <div className="flex flex-col">
          <div className="flex flex-col">
            <div className="flex items-center  text-white gap-5 pb-5">
              <h1 className="text-light text-large">Featured</h1>
              <Badge
                variant={"default"}
                className="text-sm px-3 text-white bg-accent"
              >
                Trending Movies
              </Badge>
            </div>

            <Featured
              image={featuredImage}
              altImage="Featured"
              title="Venom : The Last Dance"
              description="Eddie and Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision that will bring the curtains down on Venom and Eddie's last dance."
              badge={["Action", "Thriller"]}
            />
          </div>
        </div>
        <div className="flex flex-col pt-5 pb-10">
          <h1 className="text-light text-large">Upcoming Movies</h1>
          <div className="grid grid-cols-[repeat(auto-fit,16rem)] gap-5 pt-5">
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
      </div>
    </main>
  );
}
