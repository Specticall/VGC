"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cinemaSeeder = void 0;
const client_1 = require("@prisma/client");
const cinemas_1 = __importDefault(require("@/assets/cinemas"));
const prisma = new client_1.PrismaClient();
const cinemaSeeder = () => {
    console.log('Seeding cinemas...');
    cinemas_1.default.forEach(async (cinema) => {
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
                                create: Object.keys(room.rows).flatMap((row) => room.rows[row].map((number) => ({
                                    Number: number.number,
                                    Row: row,
                                }))),
                            },
                        })),
                    },
                },
            });
        }
        catch (e) {
            console.error(e);
        }
    });
    console.log('Cinemas seeded!');
};
exports.cinemaSeeder = cinemaSeeder;
//# sourceMappingURL=cinemaSeeder.js.map