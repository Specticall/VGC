import BackNavigation from "@/components/general/BackNavigation";
import Details from "../../public/Movie/Details.png";
import { Button } from "@/components/ui/Button";

export default function Checkout() {
  return (
    <div className="flex justify-center items-center min-h-screen p-10">
      <div className="flex flex-col items-center text-left">
        <div className="flex self-start">
          <BackNavigation
            subtitle="Back to seat booking"
            title="Checkout Order"
            to="/order-ticket"
          />
        </div>
        <div className="pt-10">
          <div className="border-2 border-border rounded text-white bg-primary">
            <div className="border-b border-border p-4">
              <p className="text-heading font-medium">Order Summary</p>
            </div>
            <div className="flex items-start justify-center p-10 border-b border-border">
              <img src={Details} alt="" className="w-[230px] h-[316px]" />
              <div className="flex flex-col pl-5 border-l border-border">
                <h1 className="text-title">Venom : The Last Dance</h1>
                <p className="text-gray text-paragraph max-w-[70%]">
                  VGC Central Park • Central Park, Jl. Letjen S. Parman No.28,
                  Tj. Duren Sel.,
                </p>
                <div className="flex items-center pt-5 gap-3 text-light">
                  <i className="bx bx-time-five text-2xl"></i>
                  <p>Monday, 18 November 2024</p>
                </div>
                <div className="flex items-center gap-3 pt-1 text-light">
                  <i className="bx bxs-calendar text-2xl "></i>
                  <p>19:00 - 21:00</p>
                </div>
                <div className="flex items-center pt-10 gap-4 text-light">
                  <i className="bx bxs-discount text-2xl"></i>
                  <p>3 Seats</p>
                </div>
                <p className="font-light">A01, A02, A03</p>
              </div>
            </div>
            <div className="text-white flex justify-between w-full px-10 border-b border-border py-10">
              <div className="flex flex-col">
                <p className="text-paragraph text-gray">Grand Total</p>
                <h3 className="text-title">Rp.210.000,-</h3>
                <p className="text-paragraph text-gray">Tax Included</p>
              </div>
              <div className="flex flex-col">
                <p className="text-gray">Seats</p>
                <p>3 x 70.000</p>
              </div>
            </div>
            <div className="flex justify-end w-full p-10  border-t border-border">
              <Button className="bg-accent text-white w-[200px] p-5 rounded-[8px]">
                Confirm Payment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
