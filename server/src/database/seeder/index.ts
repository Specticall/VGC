import { cinemaSeeder } from "./cinemaSeeder";
import { movieSeeder } from "./movieSeeder";
import { scheduleSeeder } from "./scheduleSeeder";

const runSeeders = async () => {
  try {
    await cinemaSeeder();
    await movieSeeder();
    await scheduleSeeder();
    console.log("Seeding completed.");
  } catch(e){
    console.error(e);
  }
}

runSeeders();