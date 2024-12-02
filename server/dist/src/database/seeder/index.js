"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cinemaSeeder_1 = require("./cinemaSeeder");
const movieSeeder_1 = require("./movieSeeder");
const scheduleSeeder_1 = require("./scheduleSeeder");
const runSeeders = async () => {
    try {
        await (0, cinemaSeeder_1.cinemaSeeder)();
        await (0, movieSeeder_1.movieSeeder)();
        await (0, scheduleSeeder_1.scheduleSeeder)();
        console.log("Seeding completed.");
    }
    catch (e) {
        console.error(e);
    }
};
runSeeders();
//# sourceMappingURL=index.js.map