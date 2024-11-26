const cinema_list = [
  { name: "AEON MALL TANJUNG BARAT VGC", location: "Jakarta", contact: "021-12345678", rooms: 5 },
  { name: "ARTHA GADING VGC", location: "Jakarta", contact: "021-87654321", rooms: 7 },
  { name: "BAYWALK PLUIT VGC", location: "Jakarta", contact: "021-23456789", rooms: 3 },
  { name: "CITRA VGC", location: "Jakarta", contact: "021-11223344", rooms: 4 },
  { name: "GANDARIA CITY VGC", location: "Jakarta", contact: "021-99887766", rooms: 6 },
  { name: "SUN PLAZA VGC", location: "Medan", contact: "061-11112233", rooms: 8 },
  { name: "TRANS STUDIO MALL VGC", location: "Bandung", contact: "022-55667788", rooms: 5 },
  { name: "SURABAYA TOWN SQUARE VGC", location: "Surabaya", contact: "031-33221100", rooms: 6 },
  { name: "PARK 23 VGC", location: "Bali", contact: "0361-77889911", rooms: 7 },
  { name: "AMBARRUKMO PLAZA VGC", location: "Yogyakarta", contact: "0274-77665544", rooms: 6 },
];

const generateSeats = () => {
  const seats: { [key: string]: { number: number }[] } = {};
  const addSeats = (row : string, ranges : Array<[number, number]>) => {
    seats[row] = [];
    ranges.forEach(([start, end]) => {
      for (let i = start; i <= end; i++) {
        seats[row].push({ number: i});
      }
    });
  };

  // Pola kursi
  // Rows A-K
  for (let charCode = 65; charCode <= 75; charCode++) {
    addSeats(String.fromCharCode(charCode), [[3, 4], [7, 19], [21, 22]]);
  }

  return seats;
};

const generateRooms = (numRooms : number) => {
  const rooms = [];
  for (let i = 1; i <= numRooms; i++) {
    rooms.push({
      name: `R${i}`,
      rows: generateSeats(),
    });
  }
  return rooms;
};

const generateCinemasWithRooms = () => {
  return cinema_list.map((cinema) => ({
    ...cinema,
    rooms: generateRooms(cinema.rooms),
  }));
};

const cinemas = generateCinemasWithRooms();
export default cinemas;