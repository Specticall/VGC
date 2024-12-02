import BackNavigation from "@/components/general/BackNavigation";
import ticketBackground from "../../public/Movie/ticketBackground.png";
import QR_Code from "../../public/Movie/QR_Code.png";

export default function Ticket() {
  return (
    <main className="min-h-screen pt-5 flex items-start justify-center">
      <BackNavigation subtitle="" title="" to="/movies" />
      <div className="flex justify-center">
        <div className="flex flex-col">
          <div className="relative  rounded text-white border-b border-dashed border-white">
            <img src={ticketBackground} alt="" className="w-full" />
            <div className="absolute top-20 left-0 flex flex-col items-start px-10">
              <h1 className="text-title font-bold">Venom : The Last Dance</h1>
              <p className="text-paragraph text-light max-w-[90%]">
                VGC Central Park • Central Park, Jl. Letjen S. Parman No.28, Tj.
                Duren Sel.,
              </p>
              <div className="flex justify-between items-start w-full pt-5">
                <div className="flex flex-col">
                  <p>100A</p>
                  <p className="text-light">Room</p>
                </div>
                <div className="flex flex-col">
                  <p>18 November 2024</p>
                  <p className="text-light">Date</p>
                </div>
              </div>
              <div className="flex flex-row justify-between items-start w-full pt-5">
                <div className="flex flex-col flex-grow">
                  <div className="grid grid-cols-7">
                    <p>1A</p>
                    <p>2A</p>
                    <p>3A</p>
                    <p>4A</p>
                  </div>
                  <p className="mt-2 text-light">Seats</p>
                </div>
                <div className="flex flex-col pr-11 gap-3">
                  <p>19:30 - 21:00</p>
                  <p className="text-light">Time</p>
                </div>
              </div>
            </div>
            <div className="absolute -left-6 -bottom-5 bg-background w-10 h-10 rounded-full"></div>
            <div className="absolute -right-6 -bottom-5 bg-background w-10 h-10 rounded-full"></div>
          </div>
          <div
            className="flex flex-col items-center justify-center bg-secondary p-10 rounded-[18px]
"
          >
            <img src={QR_Code} alt="QR Code" className="w-[200px] h-[200px]" />
            <p className="text-paragraph text-gray pt-10">
              SCAN TO VERIFY TICKET
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
