import { PrismaClient, Row } from '@prisma/client';
import cinemas from '@/assets/cinemas';

const prisma = new PrismaClient();

export const cinemaSeeder = () => {
  console.log('Seeding cinemas...');
  cinemas.forEach(async (cinema) => {
    try {
      await prisma.cinema.create({
        data: {
          Name: cinema.name,
          Location: cinema.location,
          Contact: cinema.contact,
          rooms: {
            create: cinema.rooms.map((room) => ({
              Name: room.name,
              SeatCapacity: 170,
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
  });
  console.log('Cinemas seeded!');
};
