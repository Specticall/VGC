import cinemaSeeder from "./cinemaSeeder";
import movieSeeder from "./movieSeeder";


async function main() {
  await cinemaSeeder();
  await movieSeeder();
}

main();