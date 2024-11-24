import { PrismaClient, Row } from '@prisma/client';
import cinemas from '../../assets/cinemas';

const prisma = new PrismaClient();

export default async function cinemaSeeder() {
  console.log('Seeding cinemas...');
  for (const cinema of cinemas) {
    try {
      await prisma.cinema.create({
        data: {
          Name: cinema.name,
          Location: cinema.location,
          Contact: cinema.contact,
          rooms: {
            create: cinema.rooms.map((room) => ({
              Name: room.name,
              SeatCapacity: 188,
              seats: {
                create: Object.keys(room.rows).flatMap((row) =>
                  room.rows[row].map((number) => ({
                    Number: number.number,
                    Row: row as Row,
                  }))
                ),
              },
            })),
          },
        },
      });
    }catch (e) {
      console.error(e);
    }
  }
  console.log('Cinemas seeded!');
}
