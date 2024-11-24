import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { TmdbCastDto, TmdbMovieDetailDto, TmdbPopularMovieDto } from '../../dto/seeder/tmdbDto';
// import createSchedules from './scheduleSeeder';

const prisma = new PrismaClient();

const TMDB_API_KEY = process.env.TMDB_API_KEY; 
const TMDB_ENDPOINT_BASE_URL = process.env.TMDB_ENDPOINT_BASE_URL || 'https://api.themoviedb.org/3';
const TMDB_MEDIA_BASE_URL = process.env.TMDB_MEDIA_BASE_URL || 'https://image.tmdb.org/t/p/original';

type Status = 'COMING_SOON' | 'NOW_SHOWING' | 'END_OF_SHOWING';

export async function fetchMovies(page: number = 1) {
  try {
    const response = await axios.get<{results: TmdbPopularMovieDto[]}>(`${TMDB_ENDPOINT_BASE_URL}/movie/popular`, {
      params: {
        api_key: TMDB_API_KEY,
        page: page,
      }
    });
    return response.data.results;
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

async function fetchMovieDetails(movieId: number) {
  try {
    const response = await axios.get<TmdbMovieDetailDto>(`${TMDB_ENDPOINT_BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: TMDB_API_KEY,
      }
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
}

async function fetchMovieCasts(movieId: number) {
  try {
    const response = await axios.get<TmdbCastDto[]>(`${TMDB_ENDPOINT_BASE_URL}/movie/${movieId}/credits`, {
      params: {
        api_key: TMDB_API_KEY,
      }
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
}

async function fetchLanguages() {
  try {
    const response = await axios.get<{ iso_639_1: string; english_name: string }[]>(`${TMDB_ENDPOINT_BASE_URL}/configuration/languages`, {
      params: {
        api_key: TMDB_API_KEY,
      }
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
}

const fetchGenres = async () => {
  try {
    const response = await axios.get<{ id: number; name: string }[]>(`${TMDB_ENDPOINT_BASE_URL}/genre/movie/list`, {
      params: {
        api_key: TMDB_API_KEY,
      }
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
}

export default async function movieSeeder() {
  console.log('Seeding movies...');
  const movieLanguages = await fetchLanguages();
  if (movieLanguages) {
    await prisma.language.createMany({
      data: movieLanguages.map((language) => ({
        IsoCode: language.iso_639_1,
        Name: language.english_name,
      })),
      skipDuplicates: true,
    });
  }

  const movieGenres = await fetchGenres();
  if (movieGenres) {
    await prisma.genre.createMany({
      data: movieGenres.map((genre) => ({
        Name: genre.name,
      })),
      skipDuplicates: true,
    });
  }

  const rooms = await prisma.room.findMany();

  let total = 0;
  for (let i = 1; i <= 47270; i++) {
    const movies = await fetchMovies(i);
    for (const movie of movies) {
      if (movie.backdrop_path && movie.poster_path) {
        const movieDetails = await fetchMovieDetails(movie.id);
        const movieCasts = await fetchMovieCasts(movie.id);
        const dayDifference = (Date.now() - new Date(movie.release_date).getTime()) / (1000 * 60 * 60 * 24);
        let status: Status;
        if (dayDifference < 0) {
          status = 'COMING_SOON';
        } else if (dayDifference <= 30) {
          status = 'NOW_SHOWING';
        } else {
          status = 'END_OF_SHOWING';
        }

        const randomRoom = rooms[Math.floor(Math.random() * rooms.length)];

        await prisma.movie.create({
          data: {
            Title: movie.title,
            Tagline: movieDetails?.tagline || '',
            DurationMinutes: movieDetails?.runtime || 0,
            Price: Math.floor(Math.random() * 100000) + 50000,
            Poster: `${TMDB_MEDIA_BASE_URL}${movie.poster_path}`,
            Status: status,
            Trailer: `${TMDB_MEDIA_BASE_URL}${movie.video}`,
            AgeRestriction: movie.adult ? 'D17' : Math.random() < 0.5 ? 'R13' : 'SU',
            ReleaseDate: movie.release_date,
            RoomId: (status==='COMING_SOON') ? null : randomRoom.RoomId,
            genres: {
              connect: movieDetails?.genres.map((genre) => ({
                MovieGenreId: genre.id.toString(),
              })),
            },
            casts: {
              create: movieCasts?.map((cast) => ({
                Name: cast.name,
                Character: cast.character || '',
                Image: cast.profile_path ? `${TMDB_MEDIA_BASE_URL}${cast.profile_path}` : null,
              })).filter(cast => cast.Name !== '' && cast.Character !== '' && cast.Image !== null),
            }
          },
        });
        // if (status !== 'COMING_SOON' && movieDetails?.runtime) {
        //   await createSchedules(movie.id, movieDetails.runtime, randomRoom.RoomId);
        // }

        console.log(`Stored ${movie.original_title}`);
        total++;
      }
      if (total === 200) {
        break;
      }
    }
    if (total === 200) {
      break;
    }
  }

  console.log(`SUCCESSFULLY SEEDS ${total}!`);
}
