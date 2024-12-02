"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleSeeder = void 0;
const autoScheduler_1 = require("@/utils/autoScheduler");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const scheduleSeeder = async () => {
    console.log("Seeding schedules...");
    const movies = await prisma.movie.findMany({
        where: {
            Status: "NOW_SHOWING",
        },
        select: {
            MovieId: true,
            DurationMinutes: true,
        },
    });
    const rooms = await prisma.room.findMany({
        select: {
            RoomId: true,
        },
    });
    const schedulesData = (0, autoScheduler_1.autoScheduler)(movies, rooms, 3);
    await prisma.schedule.createMany({
        data: schedulesData,
    });
    console.log(`Successfully seeded ${schedulesData.length} schedules.`);
};
exports.scheduleSeeder = scheduleSeeder;
//# sourceMappingURL=scheduleSeeder.js.map