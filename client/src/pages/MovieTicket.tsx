import BackNavigation from "@/components/general/BackNavigation";
import QR_Code from "../../public/Movie/QR_Code.png";
import Ticket from "@/components/Movie/Ticket";

export default function MovieTicket() {
  return (
    <main className="min-h-screen flex flex-col px-10 gap-5 pt-10">
      <BackNavigation
        subtitle="Back to movie list"
        title="My Tickets"
        to="/movies"
      />
      <div className="border border-border rounded p-6 text-white bg-primary">
        <div className="grid grid-cols-2 gap-5">
          <Ticket
            image={QR_Code}
            title="Venom : The Last Dance"
            place="VGC Central Park • Central Park, Jl. Letjen S. Parman No.28, Tj. Duren Sel."
            date="Monday, 18 November 2024"
            time="19:00 - 21:00"
            seats={3}
            seatsNumber={["A01", "A02", "A03"]}
          />
          <Ticket
            image={QR_Code}
            title="Venom : The Last Dance"
            place="VGC Central Park • Central Park, Jl. Letjen S. Parman No.28, Tj. Duren Sel."
            date="Monday, 18 November 2024"
            time="19:00 - 21:00"
            seats={3}
            seatsNumber={["A01", "A02", "A03"]}
          />
          <Ticket
            image={QR_Code}
            title="Venom : The Last Dance"
            place="VGC Central Park • Central Park, Jl. Letjen S. Parman No.28, Tj. Duren Sel."
            date="Monday, 18 November 2024"
            time="19:00 - 21:00"
            seats={3}
            seatsNumber={["A01", "A02", "A03"]}
          />
        </div>
      </div>
    </main>
  );
}
