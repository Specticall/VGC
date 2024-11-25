export default function SeatSelectorLegend() {
  return (
    <ul className="flex gap-6 items-center">
      <div className="flex gap-3 items-center">
        <div className="w-5 h-5 rounded-sm bg-border"></div>
        <p className="text-light whitespace-nowrap">Available Seat</p>
      </div>
      <div className="flex gap-3 items-center">
        <div className="w-5 h-5 rounded-sm bg-accent"></div>
        <p className="text-light whitespace-nowrap">Booked Seat</p>
      </div>
      <div className="flex gap-3 items-center">
        <div className="w-5 h-5 rounded-sm bg-white"></div>
        <p className="text-light whitespace-nowrap">SelectedSeat</p>
      </div>
    </ul>
  );
}
