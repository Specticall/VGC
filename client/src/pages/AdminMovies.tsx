import Badge from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import Table from "../components/ui/Table";

export default function AdminMovies() {
  return (
    <div className="p-6 bg-primary">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-white text-3xl">Airing Movies</h2>
        <div className="flex items-center gap-4">
          <Button variant={"primary"}>+ Add Movies</Button>
        </div>
      </div>
      <Table.Root cols="minmax(24rem,2fr) minmax(8rem,0.5fr) minmax(16rem,1fr) minmax(16rem,1fr) minmax(8rem,0.5fr)">
        <Table.Head>
          <li>Poster</li>
          <li>Duration</li>
          <li>Genre</li>
          <li>Release Date</li>
          <li>Rating</li>
        </Table.Head>

        {new Array(10).fill("x").map(() => {
          return (
            <Table.Body>
              <li className="flex items-center gap-8">
                <div className="bg-border h-20 aspect-square rounded-md"></div>
                <div>
                  <h2 className="text-white">Venom: The Last Dance</h2>
                  <p className="text-light">Eddie and Venom are on the...</p>
                </div>
              </li>
              <li className="text-light">1h 20m</li>
              <li className="flex gap-2">
                <Badge variant={"default"}>Action</Badge>
                <Badge variant={"default"} className="whitespace-nowrap">
                  3 More...
                </Badge>
              </li>
              <li className="text-light">18 November 2024</li>
              <li className="text-light">8.75</li>
            </Table.Body>
          );
        })}
      </Table.Root>
    </div>
  );
}
