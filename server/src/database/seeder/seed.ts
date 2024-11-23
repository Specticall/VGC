import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { TmdbMovieDetailDto, TmdbPopularMovieDto } from '../../dto/seeder/tmdbDto';

const prisma = new PrismaClient();

const TMDB_API_KEY = process.env.TMDB_API_KEY; 
const TMDB_ENDPOINT_BASE_URL = process.env.TMDB_ENDPOINT_BASE_URL || 'https://api.themoviedb.org/3';
const TMDB_MEDIA_BASE_URL = process.env.TMDB_MEDIA_BASE_URL || 'https://image.tmdb.org/t/p/original';

type Status = 'COMING_SOON' | 'NOW_SHOWING' | 'END_OF_SHOWING';

const CINEMAS = [
  { name: "AEON MALL TANJUNG BARAT VGC", location: "Jakarta", contact: "021-12345678", rooms: 5 }, 
  { name: "ARTHA GADING VGC", location: "Jakarta", contact: "021-87654321", rooms: 7 }, 
  { name: "BAYWALK PLUIT VGC", location: "Jakarta", contact: "021-23456789", rooms: 3 }, 
  { name: "CITRA VGC", location: "Jakarta", contact: "021-11223344", rooms: 4 }, 
  { name: "GANDARIA CITY VGC", location: "Jakarta", contact: "021-99887766", rooms: 6 }, 
];

const SEAT_TYPES = ["REGULAR", "VIP"];
const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];

const fetchMovies = async (page: number = 1) => {
  try{
    const response = await axios.get<TmdbPopularMovieDto[]>(`${TMDB_ENDPOINT_BASE_URL}/movie/popular`, {
      params: {
        api_key: TMDB_API_KEY,
        page: page,
      }
    });
    return response.data;
  }catch(e) {
    console.error(e);
    process.exit(1);
  }
};

const fetchMovieDetails = async (movieId: number) => {
  try{
    const response = await axios.get<TmdbMovieDetailDto>(`${TMDB_ENDPOINT_BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: TMDB_API_KEY,
      }
    });
    return response.data;
  }catch(e) {
    console.error(e);
  }
}

const fetchLanguages = async () => {
  try{
    const response = await axios.get<{iso_639_1: string; english_name: string}[]>(`${TMDB_ENDPOINT_BASE_URL}/configuration/languages`, {
      params: {
        api_key: TMDB_API_KEY,
      }
    })
    return response.data;
  }catch(e){
    console.error(e);
  }
}

const fetchGenres = async () => {
  try{
    const response = await axios.get<{id: number; name: string}[]>(`${TMDB_ENDPOINT_BASE_URL}/genre/movie/list`, {
      params: {
        api_key: TMDB_API_KEY,
      }
    })
    return response.data;
  }catch(e){
    console.error(e);
  }
}

const main = async () => {
  for (const cinema of CINEMAS) {
    await prisma.cinema.create({
      data: {
        Name: cinema.name,
        Location: cinema.location,
        Contact: cinema.contact,
        rooms: {
          create: Array.from({ length: cinema.rooms }).map((_, index) => ({
            Name: `R${index + 1}`,
            SeatCapacity: 50 + index * 10, 
            seats: {
              create: Array.from({ length: 50 + index * 10 }).map((_, seatIndex) => ({
                Row: ROWS[seatIndex % ROWS.length],
                Number: seatIndex + 1,
                Type: SEAT_TYPES[seatIndex % SEAT_TYPES.length],
              })),
            },
            schedules: {
              //schedules
            }
          })),
        },
      },
    });
  }

  const movieLanguages = await fetchLanguages();
  if(movieLanguages) {
    await prisma.language.createMany(
      {
        data: movieLanguages.map((language) => ({
          LanguageId: language.iso_639_1,
          Name: language.english_name
        })),
        skipDuplicates: true,
      }, 
    );
  }

  const movieGenres = await fetchGenres();
  if(movieGenres) {
    await prisma.genre.createMany(
      {
        data: movieGenres.map((genre) => ({
          GenreId: genre.id,
          Name: genre.name
        })),
        skipDuplicates: true,
      },
    );
  }

  let total = 0;
  for(let i = 1; i <= 47270; i++){
    const movies = await fetchMovies(i);
    for(const movie of movies) {
      if(movie.backdrop_path && movie.poster_path){
        const movieDetails = await fetchMovieDetails(movie.id);
        const dayDifference = (Date.now() - new Date(movie.release_date).getTime())/(1000 * 60 * 60 * 24);
        let status : Status;
        if(dayDifference < 0) {
          status = 'COMING_SOON'; 
        }else if(dayDifference <= 30) {
          status = 'NOW_SHOWING'; 
        }else{
          status = 'END_OF_SHOWING'; 
        }
        await prisma.movie.create({
          data: {
            MovieId: movie.id.toString(),
            Title: movie.title,
            Tagline: movieDetails?.tagline || '',
            DurationMinutes: movieDetails?.runtime || 0,
            Poster: `${TMDB_MEDIA_BASE_URL}${movie.poster_path}`,
            Status: status,
            Trailer: `${TMDB_MEDIA_BASE_URL}${movie.video}`,
            AgeRestriction: movie.adult ? 'D17' : Math.random() < 0.5 ? 'R13' : 'SU',
            ReleaseDate: movie.release_date,
            RoomId: ,//room id
            genres: {
              connect: movieDetails?.genres.map((genre) => ({
                MovieGenreId: genre.id.toString(),
              })),
            },
          }
        })
        console.log(`Stored ${movie.original_title}`);
        total++;
      }
      if(total === 100){
        console.log(`SUCCESSFULLY SEEDS ${total}!`)
        break;
      }
    }
    if(total === 100){
      break;
    }
  }

  console.log(`SUCCESSFULLY SEEDS ${total}!`)
};

main();
