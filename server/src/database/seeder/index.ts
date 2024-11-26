import cinemaSeeder from "./cinemaSeeder";
import movieSeeder from "./movieSeeder";
import scheduleSeeder from "./scheduleSeeder";


async function main() {
  await cinemaSeeder();
  await movieSeeder();
  await scheduleSeeder();
}

main();