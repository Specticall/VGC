"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieSeeder = void 0;
const client_1 = require("@prisma/client");
const axios_1 = __importDefault(require("axios"));
const config_1 = require("@/config/config");
const TOTAL_MOVIES = 100;
const prisma = new client_1.PrismaClient();
const fetchMovies = async (page = 1) => {
    try {
        const response = await axios_1.default.get(`${config_1.TMDB_ENDPOINT_BASE_URL}/movie/popular`, {
            params: {
                api_key: config_1.TMDB_API_KEY,
                page: page,
            },
        });
        return response.data.results;
    }
    catch (e) {
        console.error(e);
        process.exit(1);
    }
};
const fetchMovieDetails = async (movieId) => {
    try {
        const response = await axios_1.default.get(`${config_1.TMDB_ENDPOINT_BASE_URL}/movie/${movieId}`, {
            params: {
                api_key: config_1.TMDB_API_KEY,
            },
        });
        return response.data;
    }
    catch (e) {
        console.error(e);
    }
};
const fetchMovieCasts = async (movieId) => {
    try {
        const response = await axios_1.default.get(`${config_1.TMDB_ENDPOINT_BASE_URL}/movie/${movieId}/credits`, {
            params: {
                api_key: config_1.TMDB_API_KEY,
            },
        });
        return response.data.cast;
    }
    catch (e) {
        console.error(e);
    }
};
const fetchLanguages = async () => {
    try {
        const response = await axios_1.default.get(`${config_1.TMDB_ENDPOINT_BASE_URL}/configuration/languages`, {
            params: {
                api_key: config_1.TMDB_API_KEY,
            },
        });
        return response.data;
    }
    catch (e) {
        console.error(e);
    }
};
const fetchGenres = async () => {
    try {
        const response = await axios_1.default.get(`${config_1.TMDB_ENDPOINT_BASE_URL}/genre/movie/list`, {
            params: {
                api_key: config_1.TMDB_API_KEY,
            },
        });
        return response.data.genres;
    }
    catch (e) {
        console.error(e);
    }
};
const movieSeeder = async () => {
    console.log("Seeding languages...");
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
    console.log("Languages seeded!");
    console.log("Seeding genres...");
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
    console.log("Genres seeded!");
    let total = 0;
    console.log("Seeding movies & casts...");
    for (let i = 1; i <= 47270; i++) {
        const movies = await fetchMovies(i);
        for (const movie of movies) {
            if (movie.backdrop_path && movie.poster_path) {
                const movieDetails = await fetchMovieDetails(movie.id);
                const movieCasts = await fetchMovieCasts(movie.id);
                const dayDifference = (Date.now() - new Date(movie.release_date).getTime()) /
                    (1000 * 60 * 60 * 24);
                let status;
                if (dayDifference < 0) {
                    status = "COMING_SOON";
                }
                else if (dayDifference <= 60) {
                    status = "NOW_SHOWING";
                }
                else {
                    status = "END_OF_SHOWING";
                }
                await prisma.movie.create({
                    data: {
                        Title: movie.title,
                        Tagline: movieDetails?.tagline || "",
                        DurationMinutes: movieDetails?.runtime || 0,
                        Price: Math.floor(Math.random() * 100000) + 50000,
                        Poster: `${config_1.TMDB_MEDIA_BASE_URL}${movie.poster_path}`,
                        Backdrop: `${config_1.TMDB_MEDIA_BASE_URL}${movie.backdrop_path}`,
                        Status: status,
                        Trailer: movie.video
                            ? `https://www.youtube.com/watch?v=${movie.video}`
                            : null,
                        AgeRestriction: movie.adult
                            ? "D17"
                            : Math.random() < 0.5
                                ? "R13"
                                : "SU",
                        ReleaseDate: new Date(movie.release_date),
                        VoteAverage: movie.vote_average,
                        VoteCount: movie.vote_count,
                        genres: {
                            create: movieDetails?.genres.map((genre) => ({
                                genre: {
                                    connect: {
                                        GenreId: genre.id,
                                    },
                                },
                            })),
                        },
                        language: {
                            connect: {
                                LanguageId: movie?.original_language,
                            },
                        },
                        casts: {
                            create: movieCasts
                                ?.filter((cast) => cast.character)
                                .map((cast) => ({
                                cast: {
                                    create: {
                                        Name: cast.original_name,
                                        Character: cast.character || "",
                                        Image: cast.profile_path
                                            ? `${config_1.TMDB_MEDIA_BASE_URL}${cast.profile_path}`
                                            : null,
                                    },
                                },
                            })),
                        },
                    },
                });
                total++;
                console.log(`(${total}/${TOTAL_MOVIES}) Stored ${movie.original_title} with ${movieCasts
                    ?.filter((cast) => cast.character).length} casts`);
            }
            if (total === TOTAL_MOVIES) {
                break;
            }
        }
        if (total === TOTAL_MOVIES) {
            break;
        }
    }
    console.log(`Successfully seeded ${total} movies & its casts!`);
};
exports.movieSeeder = movieSeeder;
//# sourceMappingURL=movieSeeder.js.map