import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { TmdbCastDto, TmdbMovieDetailDto, TmdbPopularMovieDto } from '../../dto/seeder/tmdbDto';
import { TMDB_API_KEY, TMDB_ENDPOINT_BASE_URL, TMDB_MEDIA_BASE_URL } from '../../utils/config';

const prisma = new PrismaClient();

type Status = 'COMING_SOON' | 'NOW_SHOWING' | 'END_OF_SHOWING';

async function fetchMovies(page: number = 1) {
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
    const response = await axios.get<{cast: TmdbCastDto[]}>(`${TMDB_ENDPOINT_BASE_URL}/movie/${movieId}/credits`, {
      params: {
        api_key: TMDB_API_KEY,
      }
    });
    return response.data.cast;
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

async function fetchGenres() {
  try {
    const response = await axios.get<{genres: { id: number; name: string }[]}>(`${TMDB_ENDPOINT_BASE_URL}/genre/movie/list`, {
      params: {
        api_key: TMDB_API_KEY,
      }
    });
    return response.data.genres;
  } catch (e) {
    console.error(e);
  }
}

export default async function movieSeeder() {
  console.log('Seeding languages...');
  const movieLanguages = await fetchLanguages();
  if (movieLanguages) {
    await prisma.language.createMany({
      data: movieLanguages.map((language) => ({
        LanguageId: language.iso_639_1,
        Name: language.english_name,
      })),
      skipDuplicates: true,
    });
  }
  console.log('Languages seeded!');
  console.log('Seeding genres...');
  const movieGenres = await fetchGenres();
  if (movieGenres) {
    await prisma.genre.createMany({
      data: movieGenres.map((genre) => ({
        GenreId: genre.id,
        Name: genre.name,
      })),
      skipDuplicates: true,
    });
  }
  console.log('Genres seeded!');
  let total = 0;
  console.log('Seeding movies & casts...');
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
        } else if (dayDifference <= 60) {
          status = 'NOW_SHOWING';
        } else {
          status = 'END_OF_SHOWING';
        }

        await prisma.movie.create({
          data: {
            Title: movie.title,
            Tagline: movieDetails?.tagline || '',
            DurationMinutes: movieDetails?.runtime || 0,
            Price: Math.floor(Math.random() * 100000) + 50000,
            Poster: `${TMDB_MEDIA_BASE_URL}${movie.poster_path}`,
            Backdrop: `${TMDB_MEDIA_BASE_URL}${movie.backdrop_path}`,
            Status: status,
            Trailer: movie.video ? `https://www.youtube.com/watch?v=${movie.video}` : null,
            AgeRestriction: movie.adult ? 'D17' : Math.random() < 0.5 ? 'R13' : 'SU',
            ReleaseDate: new Date(movie.release_date),
            VoteAverage: movie.vote_average,
            VoteCount: movie.vote_count,
            genres: {
              create: movieDetails?.genres.map((genre) => ({
                genre : {
                  connect: {
                    GenreId: genre.id,
                  }
                },
              })),
            },
            language:{
              connect: {
                LanguageId: movie?.original_language,
              }
            },
            casts: {
              create: movieCasts?.filter(cast => cast.character).map((cast) => ({
                cast: {
                  create: {
                    Name: cast.original_name,
                    Character: cast.character || "",
                    Image: cast.profile_path ? `${TMDB_MEDIA_BASE_URL}${cast.profile_path}` : null,
                  }
                }
              })),
            },
          },
        });

        console.log(`Stored ${movie.original_title}`);
        total++;
      }
      if (total === 100) {
        break;
      }
    }
    if (total === 100) {
      break;
    }
  }

  console.log(`Successfully seeded ${total} movies & its casts!`);
}
