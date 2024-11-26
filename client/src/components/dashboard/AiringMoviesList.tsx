import Badge from "../ui/Badge";
import Table from "../ui/Table";

export default function AiringMoviesList() {
  return (
    <div className="p-6 bg-primary border-t border-border">
      <h2 className="text-2xl mb-6">Airing Movies</h2>
      <Table.Root cols="minmax(24rem,1.5fr) minmax(12rem,0.5fr) minmax(16rem,1fr) repeat(2,minmax(8rem,0.5fr))">
        <Table.Head>
          <li>Movie Details</li>
          <li>Status</li>
          <li>Genre</li>
          <li>Room</li>
          <li>Seats Left</li>
        </Table.Head>
        {new Array(10).fill("x").map((_, i) => {
          return (
            <Table.Body key={i}>
              <li className="flex items-center gap-8">
                <div className="bg-border h-20 aspect-square rounded-md"></div>
                <div>
                  <h2>Venom: The Last Dance</h2>
                  <p className="text-light">Eddie and Venom are on the...</p>
                </div>
              </li>
              <Badge variant={"green"}>Airing</Badge>
              <li className="flex gap-2">
                <Badge variant={"default"}>Action</Badge>
                <Badge variant={"default"} className="whitespace-nowrap">
                  3 More...
                </Badge>
              </li>
              <li className="text-light">105</li>
              <li className="text-light">32</li>
            </Table.Body>
          );
        })}
      </Table.Root>
    </div>
  );
}
